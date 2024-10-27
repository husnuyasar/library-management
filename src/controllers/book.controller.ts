import { validationResult } from "express-validator";
import { BooksService } from "../services/book.service";
import { Request, Response, NextFunction } from "express";
import { BookResponse } from "../interfaces/bookResponse.interface";
import { BaseResponse } from "../interfaces/baseResponse.interface";

export class BooksController {
    private bookService = new BooksService;

    async getAll(req : Request, res : Response, next : NextFunction) {
        try {
            const books = await this.bookService.getAll();
            const response : BaseResponse [] = books?.map(book => ({
              id: book.id,
              name: book.name
            })) || [];
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async getById(req : Request, res : Response, next : NextFunction) : Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const bookId = Number(req.params.id);
            const book = await this.bookService.getById(bookId);
            if (!book) {
              return res.status(404).json({ message: "Book not found" });
            }
            const response = {
              id: book.id,
              name: book.name,
              score: book.averageRating
            } as BookResponse;
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) : Promise<any> {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          const { name } = req.body;
          const newBook = await this.bookService.create(name);
          res.status(201).send();
        } catch (error) {
          next(error);
        }
    }
}