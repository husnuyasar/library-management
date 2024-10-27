import { ErrorUtil } from "../errorUtil";
import { BorrowingRecordFilters } from "../interfaces/borrowingRecordFilters.interface";
import { ReturnBookFilters } from "../interfaces/returnBookFilters.interface";
import { BorrowingRecordsRepository } from "../repositories/borrowingRecord.repository";
import { BooksService } from "./book.service";
import { UsersService } from "./user.service";
import { sumBy } from "lodash";

export class BorrowingRecordsService {
    private borrowingRecordRepository = new BorrowingRecordsRepository();
    private userService = new UsersService();
    private bookService = new BooksService();

    private async validateUser(userId: number) {
        const user = await this.userService.getById(userId);
        if (!user) {
            throw ErrorUtil.createError(`User id "${userId}" not found`, 404);
        }
        return user;
    }

    private async validateBook(bookId: number) {
        const book = await this.bookService.getById(bookId);
        if (!book) {
            throw ErrorUtil.createError(`Book id "${bookId}" not found`, 404);
        }
        return book;
    }

    async borrowBook(filter : BorrowingRecordFilters) {
        const {userId, bookId} = filter;
   
        const user = await this.validateUser(userId);
        const book = await this.validateBook(bookId);
   
        const borrowingRecord = await this.borrowingRecordRepository.get({ bookId, returned: false } as BorrowingRecordFilters);
        if(borrowingRecord) {
            throw ErrorUtil.createError(`Book with ID "${bookId}" is already borrowed and has not been returned.`,409);
        }

        await this.borrowingRecordRepository.add(user, book);
    }

    async returnBook(filter : ReturnBookFilters) {
        const { userId, bookId, score} = filter;
        await this.validateUser(userId);
        const book = await this.validateBook(bookId);

        const borrowingRecord = await this.borrowingRecordRepository.get(filter);
        if(!borrowingRecord) {
            throw ErrorUtil.createError(`Book id "${bookId}" was not borrowed by user id "${userId}"`,404);
        }
        else if(borrowingRecord && borrowingRecord?.returnDate) {
            throw ErrorUtil.createError(`Book id "${bookId}" had already returned by user id "${userId}"`,404);
        }
        
        borrowingRecord.returnDate = new Date();
        borrowingRecord.rating = score;

        await this.borrowingRecordRepository.save(borrowingRecord);
        const averageRating = await this.getRatingsForBook(bookId);
        await this.bookService.updateAverageRating(book,averageRating);
    }

    private async getRatingsForBook(bookId : number) : Promise<number> {
        const borrowingRecords = await this.borrowingRecordRepository.getAll({bookId ,returned: true} as ReturnBookFilters);
        if(borrowingRecords?.length>0) {
            const totalRating = sumBy(borrowingRecords,'rating');
            return totalRating / borrowingRecords.length;
        }
        return 0;
    }
}