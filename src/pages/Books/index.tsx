import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userNotAuthenticated } from '../../redux/auth';
import {
  getBooksSelector,
  removeBook,
  updateRentBook,
} from "../../redux/books";
import { useAppDispatch } from "../../redux/hooks";

const Books: React.FC = () => {
  const history = useHistory();
  const books = useSelector(getBooksSelector);

  const dispatch = useAppDispatch();

  const removeFromStore = (id: string): any => dispatch(removeBook(id));

  const rentBook = (id: string): any => {dispatch(updateRentBook(id))};

  const logout = (): any => {
    dispatch(userNotAuthenticated());
    history.push('/');
  };

  return (
    <div>
      <h2>Books List</h2>
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
      {books.map((book) => (
        <div key={book.id}>
          <span>{`${book.author}: ${book.title}`}</span>
          <Link to={`/books/edit/${book.id}`}>
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
