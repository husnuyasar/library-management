import { NextFunction, Response, Request } from "express";
import { body, param, ValidationChain, validationResult } from "express-validator";
import { Raw, Repository } from "typeorm";

export const idValidator : ValidationChain [] = [
    param('id')
      .isNumeric()
      .withMessage('Id must be a number')
];

export const borrowValidationChain:  ValidationChain [] = [
    param('userId')
      .isInt()
      .withMessage('User Id must be a number'),
    param('bookId')
      .isInt()
      .withMessage('Book Id must be a number'),
]

export const returnValidationChain:  ValidationChain [] = [
  param('userId')
      .isInt()
      .withMessage('User Id must be a number'),
    param('bookId')
      .isInt()
      .withMessage('Book Id must be a number'),
  body('score')
    .isInt({ min: 1, max: 10 })
    .withMessage('Score must be an integer between 1 and 10'),
]


type EntityName = 'user' | 'book';

const nameValidationChain: ValidationChain = body('name')
  .trim()
  .isString()
  .notEmpty()
  .withMessage('Name must be a non-empty string');

export const createValidator = (
  entityName: EntityName,
  repository: Repository<any>
) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  await nameValidationChain.run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const existingEntity = await repository.findOne({
    where: { name: Raw(alias => `LOWER(${alias}) = LOWER(:name)`, { name }) },
  });

  if (existingEntity) {
    return res.status(409).json({ message: `The ${entityName} with this name already exists` });
  }

  next();
};