import React, { useState } from 'react';
import { createSelectorHook, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import { Book } from '../../interfaces/book';
import { addBook, updateBook } from '../../redux/books';
import { useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';

const BooksForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const { id }: { id: string } = useParams();

  const useSelector = createSelectorHook<RootState>();

  const bookFromStore = useSelector((state) =>
    state.books.find((book) => book.id === id)
  );

  const initialBook:Book = {
    id: "",
    title: "",
    author: "",
    pages: 0,
    rented: false,
  };

  const [book, setBook] = useState<Book>(bookFromStore || initialBook);

  const handleSubmmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setError("");
    if (!book.title || !book.author || !book.pages) {
      setError("Fill in all fields");
    } else {
      dispatch(updateBook(book));

      history.push("/books");
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
  }));

  return (
    <>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={book.title}
          onChange={handleChange}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          placeholder="author"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
        <label htmlFor="pages">Number of pages</label>
        <input
          type="number"
          placeholder="pages"
          name="pages"
          value={book.pages}
          onChange={handleChange}
        />
        <label htmlFor="rented">Rented ?</label>
        <input
          name="rented"
          type="checkbox"
          defaultChecked={book.rented}
          onChange={handleChange}
        />
        {error && error}
        <button type="submit">Save book</button>
      </form>
    </>
  );
};

export default BooksForm;
