import { BaseResponse } from "./baseResponse.interface";

export interface UserBook {
    name: string;
    userScore?: number;
}

export interface UserBooks {
    past: UserBook[];
    present: UserBook[];
}

export interface UserResponse extends BaseResponse{
    books: UserBooks;
}