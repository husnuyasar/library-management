export interface UserBook {
    name: string;
    userScore?: number;
}

export interface UserBooks {
    past: UserBook[];
    present: UserBook[];
}

export interface UserResponse {
    id: number;
    name: string;
    books: UserBooks;
}