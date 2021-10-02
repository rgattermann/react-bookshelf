import { v4 as uuidv4 } from 'uuid';
import { Book } from '../interfaces/book';

export const bookList: Book[] = [
  {
    id: uuidv4(),
    title: '1984',
    author: 'George Orwell',
    pages: 275,
    rented: false,
  },
  {
    id: uuidv4(),
    title: 'Harry Potter and the Philosophers Stone',
    author: 'J. K. Rowling',
    pages: 314,
    rented: false,
  },
  {
    id: uuidv4(),
    title: 'The Lord of the Rings',
    author: 'J.R.R Tolkien',
    pages: 653,
    rented: false,
  },
];
