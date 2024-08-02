// types/user.ts
export interface UserData {
    key: string;
    name: string;
    cat: string;
    gen: string;
    favorites: string[];
    booksRead: string[];
    booksReading: string[];
    booksOpened: number;
    modal: {
        [key: string]: boolean;
    };
}

export interface User {
    key: string;
    time: string;
    user_data: UserData;
}
