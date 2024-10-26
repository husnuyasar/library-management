import { BooksRepository } from "../repositories/book.repository";
import { BorrowingRecordsRepository } from "../repositories/borrowingRecord.repository";
import { UsersRepository } from "../repositories/user.repository";

export const seedBorrowingRecord = async () => {
    const borrowingRecordRepository = new BorrowingRecordsRepository();
    const usersRepository = new UsersRepository();
    const booksRepository = new BooksRepository();
  
    // Check the table is empty or not
    const borrowingRecords = await borrowingRecordRepository.find();
    if (borrowingRecords.length > 0) return;
  
    // Fetch existing users and books
    const users = await usersRepository.find();
    const books = await booksRepository.find();

    // Create example borrowing records with actual user and book entities
    const newRecords = [
        { user: users.find(u => u.id === 1), book: books.find(b => b.id === 1), borrowDate: new Date("2024-10-20T10:00:00"), returnDate: new Date("2024-10-23T15:00:00"), rating: 8 },
        { user: users.find(u => u.id === 2), book: books.find(b => b.id === 2), borrowDate: new Date("2024-10-18T09:00:00"), returnDate: new Date("2024-10-20T13:00:00"), rating: 6 },
        { user: users.find(u => u.id === 3), book: books.find(b => b.id === 3), borrowDate: new Date("2024-10-22T12:00:00"), returnDate: null, rating: null },
        { user: users.find(u => u.id === 4), book: books.find(b => b.id === 4), borrowDate: new Date("2024-10-13T13:00:00"), returnDate: new Date("2024-10-19T17:00:00"), rating: 9 },
        { user: users.find(u => u.id === 1), book: books.find(b => b.id === 2), borrowDate: new Date("2024-10-21T09:00:00"), returnDate: new Date("2024-10-23T13:00:00"), rating: 5 },
        { user: users.find(u => u.id === 2), book: books.find(b => b.id === 1), borrowDate: new Date("2024-10-24T08:00:00"), returnDate: null, rating: null },
        { user: users.find(u => u.id === 3), book: books.find(b => b.id === 4), borrowDate: new Date("2024-10-22T10:00:00"), returnDate: new Date("2024-10-23T14:00:00"), rating: 7 }
    ];

    await borrowingRecordRepository.save(newRecords);
};