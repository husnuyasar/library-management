import { BorrowingRecordFilters } from "./borrowingRecordFilters.interface";

export interface ReturnBookFilters extends  BorrowingRecordFilters {
    score : number
}