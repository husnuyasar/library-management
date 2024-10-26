import express from 'express';
import { AppDataSource } from './data-source';
import errorHandler from './middleware/error-handler';
import usersRoutes from './routes/user.route';
import booksRoutes from './routes/book.route';
import { seedBooks } from './seeders/book.seeder';
import { seedUsers } from './seeders/user.seeder';
import { seedBorrowingRecord } from './seeders/borrowingRecord.seeder';

const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async()=> {
    app.use(express.json());

    await seedUsers()
    await seedBooks()
    await seedBorrowingRecord()

    app.use('/users', usersRoutes);
    app.use('/books', booksRoutes);
    app.use(errorHandler)
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err)=> console.error(err.message))
