/**
 * service/question-service.ts
 * Firebase service to handle questions for users
 * @autor  Ashok Saravanan, https://github.com/AshokSaravanan222
 * @updated 2024-08-01
 *
 */

import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Question } from "../types/question"; // Importing the Question type

type QuestionWithId = Question & { id: string };

export class QuestionService {
    private readonly firestore: FirebaseFirestoreTypes.Module;
    private readonly questions: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

    constructor() {
        // React Native Firebase automatically initializes the default app instance
        this.firestore = firestore();
        this.questions = this.firestore.collection('questions');
    }

    async getAllQuestions(): Promise<Question[]> {
        const snapshot = await this.questions.get();
        const allQuestions = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return {
                id: id,
                ...data,
            } as QuestionWithId;
        });

        const sortedQuestions = allQuestions.sort((a, b) => {
            const idA = parseInt(a.id, 10);
            const idB = parseInt(b.id, 10);
            return idA - idB;
        });

        const questions = sortedQuestions.map(question => {
            return {
                questionType: question.questionType,
                questionText: question.questionText,
                questionId: question.questionId,
                questionSettings: question.questionSettings,
                options: question.options,
            } as Question
        })
        return questions;
    }
}
