import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getBooksSelector,
  getBookSelector,
  removeBook,
  updateBook,
  updateRentBook,
} from "../../redux/books";
import { useAppDispatch } from "../../redux/hooks";
import BooksForm from "../BooksForm";

const Books: React.FC = () => {
  const books = useSelector(getBooksSelector);

  const dispatch = useAppDispatch();

  const removeFromStore = (id: string): any => dispatch(removeBook(id));

  const rentBook = (id: string): any => {dispatch(updateRentBook(id))};

  return (
    <div>
      <h2>Books List</h2>
      {books.map((book) => (
        <div key={book.id}>
          <span>{`${book.author}: ${book.title}`}</span>
          <button type="button" onClick={() => removeFromStore(book.id)}>
            Remove
          </button>
          <button type="button" onClick={() => rentBook(book.id)}>
            Alugar
          </button>
        </div>
      ))}
      <BooksForm />
    </div>
  );
};

export default Books;
