// types/book.ts
export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    publisher: string;
    publishedDate: string;
    pageCount: number;
    genres: string[];
    averageRating: number;
    ratingsCount: number;
    smallThumbnail: string;
    thumbnail: string;
    country: string;
    amount: string;
    currencyCode: string;
    buyLink: string;
    weights: { [key: string]: string | number }[]; // string but value is number
    score?: number[];
    genre?: string[];
}
