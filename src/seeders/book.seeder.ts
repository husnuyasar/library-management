import { BooksRepository } from "../repositories/book.repository";

export const seedBooks = async () => {
    const bookRepository = new BooksRepository
  
    // Check the table is empty or not
    const books = await bookRepository.find();
    if(books && books.length>0) return;
  
    // Example books data
    const newBooks = [
      { name: "The Hitchhiker's Guide to the Galaxy", averageRating: 8 },
      { name: "I, Robot", averageRating: 5.5 },
      { name: "Dune", averageRating: -1 },
      { name: "1984", averageRating: 8 },
    ];
  
    await bookRepository.save(newBooks);
};