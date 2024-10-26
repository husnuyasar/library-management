import { Books } from "../entities/book.entity";
import { BooksRepository } from "../repositories/book.repository";

export class BooksService {
    private bookRepository = new BooksRepository();

    async getAll() : Promise<Books [] | null>{
        return await this.bookRepository.findAll();
    }

    async getById(id : number) : Promise<Books | null>{
        return await this.bookRepository.findById(id);
    }

    async create(name : string) : Promise<Books> {
        const book = new Books;
        book.name = name;
        return await this.bookRepository.add(book);
    }

    async updateAverageRating(book : Books, averageRating : number) : Promise<void> {
        book.averageRating = averageRating;
        await this.bookRepository.save(book);
    }
}