import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../interfaces/book';
import { addBook } from '../../redux/books';
import { useAppDispatch } from '../../redux/hooks';

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const initialBook:Book = {
    id: "",
    title: "",
    author: "",
    pages: 0,
    rented: false,
  };

  const [book, setBook] = useState<Book>(initialBook);

  const [error, setError] = useState("");

  const handleSubmmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setError("");
    if (!book.title || !book.author || !book.pages) {
      setError("Fill in all fields");
    } else {
      if (!book.id) book.id = uuidv4();

      dispatch(addBook(book));

      history.push('/');
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    })
  );

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
        <button type="submit">Add book</button>
      </form>
    </>
  );
};

export default AddBook;
