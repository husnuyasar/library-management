import { Repository } from "typeorm";
import { Books } from "../entities/book.entity";
import { AppDataSource } from "../data-source";

export class BooksRepository extends Repository<Books> {
    constructor() {
        super(Books,AppDataSource.createEntityManager())
    }
      
    async findAll() {
        return this.find();
    }

    async findById(id : number) {
        return this.findOne({ where: {id} });
    }

    async add(book: Books) {
        return this.save(book);
    }
}