import { validationResult } from "express-validator";
import { UsersService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { BorrowingRecordsService } from "../services/borrowingRecord.service";
import { BorrowingRecordFilters } from "../interfaces/borrowingRecordFilters.interface";
import { ReturnBookFilters } from "../interfaces/returnBookFilters.interface";
import { BaseResponse } from "../interfaces/baseResponse.interface";

export class UsersController {
    private userService = new UsersService();
    private borrowingRecordService = new BorrowingRecordsService();

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAll();
            const response: BaseResponse[] = users?.map(user => ({
              id: user.id,
              name: user.name
            })) || [];
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) : Promise<any>{
        try {
          const userId = Number(req.params.id);
          const user = await this.userService.getWithBooksById(userId);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          res.json(user);
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
          const newUser = await this.userService.create(name);
          res.status(201).send();
        } catch (error) {
          next(error);
        }
    }

    async borrowBook(req: Request, res: Response, next: NextFunction) : Promise<any> {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const userId = Number(req.params.userId);
        const bookId = Number(req.params.bookId);
        await this.borrowingRecordService.borrowBook({
          bookId,
          userId
        } as BorrowingRecordFilters)
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }

    async returnBook(req: Request, res: Response, next: NextFunction) : Promise<any> {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const userId = Number(req.params.userId);
        const bookId = Number(req.params.bookId);
        const { score } = req.body;
        await this.borrowingRecordService.returnBook({
          bookId,
          userId,
          score
        } as ReturnBookFilters)
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
}