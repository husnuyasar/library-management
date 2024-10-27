import { BaseResponse } from "./baseResponse.interface";

export interface BookResponse extends BaseResponse {
    score: number;
}