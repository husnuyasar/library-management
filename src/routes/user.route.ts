import { NextFunction, Router, Request, Response } from "express";
import { UsersController } from "../controllers/user.controller";
import { idValidator, createValidator, borrowValidationChain, returnValidationChain }  from "../validators/validator";
import { UsersRepository } from "../repositories/user.repository";

const router = Router();
const userController = new UsersController();
const userRepository = new UsersRepository();

const userValidator = createValidator('user', userRepository);

router.get("/", (req : Request, res : Response, next: NextFunction) => userController.getAll(req, res, next));
router.get("/:id", idValidator, (req : Request, res : Response, next: NextFunction) => userController.getById(req, res, next));
router.post("/", userValidator, (req : Request, res : Response, next: NextFunction) => userController.create(req, res, next));
router.post("/:userId/borrow/:bookId",borrowValidationChain, (req : Request, res : Response, next: NextFunction) => userController.borrowBook(req, res, next))
router.post("/:userId/return/:bookId",returnValidationChain, (req : Request, res : Response, next: NextFunction) => userController.returnBook(req, res, next))


export default router;