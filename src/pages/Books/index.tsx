import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {
  getBooksSelector,
  removeBook,
  updateRentBook,
} from "../../redux/books";
import { useAppDispatch } from "../../redux/hooks";

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
          <Link to={`/edit-book/${book.id}`}>
            <button>Edit</button>
          </Link>
          <button type="button" onClick={() => removeFromStore(book.id)}>
            Remove
          </button>
          <button type="button" onClick={() => rentBook(book.id)}>
            Alugar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Books;
