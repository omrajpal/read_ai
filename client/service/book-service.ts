// book-service.ts
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { similarityPercentage, rescaleSimilarity } from '../utils/similarity-utils';
import { Book } from '../types/book';

const genres = ['Personal Growth', 'Leadership Management', 'Creativity', 'Finance Wealth', 'Communication Relationships', 'Health Wellness', 'Mindfulness', 'Spirituality'];

export class BookService {
    private readonly firestore: FirebaseFirestoreTypes.Module;
    private readonly books: FirebaseFirestoreTypes.CollectionReference;
    private readonly userWeights: { [key: string]: number[] };

    constructor(cat: string, gen: string) {
        this.firestore = firestore();
        this.books = this.firestore.collection('books');

        var catData = '111111111111111111111111'
        var genData = '111'
        if (cat && gen) {
            catData = cat;
            genData = gen;
        }

        const catWeights = [7.0, 9.5, 8.5, 6.0, 4.0];
        const genWeights = [10.0, 9.0, 8.0, 7.0, 6.0];
        
        const userWeights: { [key: string]: number[] } = {};
        
        genres.forEach((genre, idx) => {
            const wgts: number[] = [];
            
            for (let char of catData.slice(3 * idx, 3 * (idx + 1))) {
                wgts.push(catWeights[parseInt(char) - 1]);
            }
            
            for (let char of genData) {
                wgts.push(genWeights[parseInt(char) - 1]);
            }

            userWeights[genre] = wgts;
        });
        this.userWeights = userWeights;
    }

    private processBooks(books: FirebaseFirestoreTypes.DocumentData[], top: boolean): Book[] {
        const processedBooks = books.map(book => {
            const weights = book.weights;
            const scores: number[] = [];
            const genres: string[] = [];
            
            weights.forEach((weight: Book['weights'][0]) => {
                const genre = weight.Genre as string;
                const numericalWeights = Object.fromEntries(Object.entries(weight).filter(([key]) => key !== 'Genre'));
                const bookWeights = Object.values(numericalWeights).map(Number);
                scores.push(rescaleSimilarity(similarityPercentage(this.userWeights[genre], bookWeights, [2, 2, 2, 1, 1, 1])));
                genres.push(genre);
            });

            return {
                ...book,
                score: scores,
                genre: genres,
            } as Book;
        });
        const uniqueBooks = Array.from(new Map(processedBooks.map(book => [book.id, book])).values());

        const sortedBooks = uniqueBooks.sort((a, b) => {
            const maxScoreA = Math.max(...a.score);
            const maxScoreB = Math.max(...b.score);
            return maxScoreB - maxScoreA;
        });

        if (top) {
            const genresCount: { [key: string]: number } = {};
            const topBooks: Book[] = [];

            for (const book of sortedBooks) {
                const genre = book.genre[0]; // Assuming the first genre is the primary genre
                if (!genresCount[genre]) {
                    genresCount[genre] = 0;
                }

                if (genresCount[genre] < 7) {
                    topBooks.push(book);
                    genresCount[genre]++;
                }

                if (topBooks.length >= 50) {
                    break;
                }
            }

            return topBooks;
        }

        return sortedBooks;
    }

    async getAllBooks(top: boolean = false): Promise<Book[]> {
        const booksSnapshot = await this.books.get();
        const books = booksSnapshot.docs.map(doc => doc.data());
        return this.processBooks(books, top);
    }

    async getBookById(id: string): Promise<Book[] | null> {
        const bookDoc = (await this.books.where('id', '==', id).get()).docs[0].data();
        return this.processBooks([bookDoc], false);
    }

    async getBooksByGenre(genre: string, top: boolean = false): Promise<Book[]> {
        const booksSnapshot = await this.books.get();
        const genreBookSnapshot = booksSnapshot.docs.filter(doc => doc.data().weights.some((weight: Book['weights'][0]) => weight.Genre === genre));
        const books = genreBookSnapshot.map(doc => doc.data());
        return this.processBooks(books, top);
    }

    async getTopBooks(): Promise<Book[]> {
        return this.getAllBooks(true);
    }

    async getSimilarBooks(bookId: string): Promise<Book[]> {
        const bookDoc = await this.getBookById(bookId);
        if (!bookDoc) throw new Error(`Book with ID ${bookId} not found`);
        const book = bookDoc[0];

        const genreIndex = Math.floor(Math.random() * book.weights.length);
        const bookGenre = book.weights[genreIndex].Genre as string;
        const numericalWeights = Object.fromEntries(Object.entries(book.weights).filter(([key]) => key !== 'Genre'));
        const bookWeights = Object.values(numericalWeights).map(Number);

        const similarBooksSnapshot = await this.getBooksByGenre(bookGenre);
        const similarBooks = similarBooksSnapshot.map((doc: FirebaseFirestoreTypes.DocumentData) => {
            const numericalWeights = Object.fromEntries(Object.entries(doc.weights).filter(([key]) => key !== 'Genre'));
            const weights = Object.values(numericalWeights[genreIndex]).map(Number);
            const similarity = similarityPercentage(bookWeights, weights, Array(6).fill(1));
            const score = rescaleSimilarity(similarity);
            return {
                ...doc,
                score: [score],
            } as Book;
        });

        return this.processBooks(similarBooks, false).slice(0, 10);
    }
}
