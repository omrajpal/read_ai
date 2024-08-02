// types/question.ts
export interface Question {
    questionType: string;
    questionText: string;
    questionId: string;
    questionSettings?: {
        allowDeselect: boolean;
    };
    options?: {
        optionText: string;
        value: string;
    }[];
}
