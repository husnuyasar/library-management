import { Repository } from "typeorm";
import { BorrowingRecords } from "../entities/borrowingRecord.entity";
import { AppDataSource } from "../data-source";
import { BorrowingRecordFilters } from "../interfaces/borrowingRecordFilters.interface";
import { Users } from "../entities/user.entity";
import { Books } from "../entities/book.entity";

export class BorrowingRecordsRepository extends Repository<BorrowingRecords> {
    constructor() {
        super(BorrowingRecords, AppDataSource.createEntityManager())
    }

    async get(filter : BorrowingRecordFilters) {
        const { id, userId, bookId, returned } = filter;
        const data = await this.createQueryBuilder('br')
                    .innerJoin('br.user','u')
                    .innerJoin('br.book','b')
                    .orderBy('br.borrowDate','DESC')
        if(id)
            data.andWhere('br.id =:id', {id})
        if(userId) 
            data.andWhere('u.id =:userId', {userId})
        if(bookId)
            data.andWhere('b.id =:bookId', {bookId})
        if (typeof returned !== "undefined") {
            if (returned) {
                data.andWhere('br.returnDate IS NOT NULL');
            } else {
                data.andWhere('br.returnDate IS NULL');
            }
        }
        return await data.getOne();
    }

    async getAll(filter : BorrowingRecordFilters) {
        const { userId, bookId, returned } = filter;
        const data = await this.createQueryBuilder('br')
                    .innerJoin('br.user','u')
                    .innerJoin('br.book','b')
        if(userId) 
            data.andWhere('u.id =:userId', {userId})
        if(bookId)
            data.andWhere('b.id =:bookId', {bookId})
        if (typeof returned !== "undefined") {
            if (returned) {
                data.andWhere('br.returnDate IS NOT NULL');
            } else {
                data.andWhere('br.returnDate IS NULL');
            }
        }
        return await data.getMany();
    }

    async add(user: Users, book: Books) {
        const borrowingRecord = new BorrowingRecords();
        borrowingRecord.book = book;
        borrowingRecord.user = user;
        await this.save(borrowingRecord);
    }
}