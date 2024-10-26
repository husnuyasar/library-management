import { Router } from "express";
import { BooksController } from "../controllers/book.controller";
import { idValidator, createValidator } from "../validators/validator";
import { Request, Response, NextFunction } from "express";
import { BooksRepository } from "../repositories/book.repository";

const router = Router();
const bookController = new BooksController();
const bookRepository = new BooksRepository();

const bookValidator = createValidator('book',bookRepository)


router.get("/", (req : Request, res : Response, next: NextFunction) => bookController.getAll(req, res, next));
router.get("/:id", idValidator, (req : Request, res : Response, next: NextFunction) => bookController.getById(req, res, next));
router.post("/", bookValidator, (req : Request, res : Response, next: NextFunction) => bookController.create(req, res, next));

export default router;