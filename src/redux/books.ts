import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../interfaces/book';
import { RootState } from './store';
import { bookList } from '../data/books';

const booksSlice = createSlice({
  name: 'books',
  initialState: bookList,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.push(action.payload);
    },

    updateBook: (state, action: PayloadAction<Book>) => {
      const { id, title, author, pages, rented } = action.payload;

      const existingBook = state.find((book) => book.id === id);

      if (existingBook) {
        existingBook.title = title;
        existingBook.author = author;
        existingBook.pages = pages;
        existingBook.rented = rented;
      }
    },

    updateRentBook: (state, action: PayloadAction<string>) => {
      const existingBook = state.find((book) => book.id === action.payload);

      if (existingBook) {
        existingBook.rented = !existingBook.rented;
      }
    },

    removeBook: (state, action: PayloadAction<string>) => {
      return state.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, removeBook, updateBook, updateRentBook } = booksSlice.actions;

export const getBooksSelector = (state: RootState): Book[] => state.books;

export const getBookSelector = (state: RootState, id: string): any =>
  state.books.find((book) => book.id === id);

export default booksSlice.reducer;
