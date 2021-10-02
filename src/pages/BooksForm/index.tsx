import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../interfaces/book';
import { addBook } from '../../redux/books';
import { useAppDispatch } from '../../redux/hooks';

const BooksForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [book, setBook] = useState<Book>({
    id: '',
    title: '',
    author: '',
    pages: 0,
    rented: false,
  });

  const handleSubmmit = (event: React.FormEvent): void => {
    event.preventDefault();

    book.id = uuidv4();

    dispatch(addBook(book));
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setBook(prev => {
      // TODO: verify this error from eslint
      (prev as any)[name] = value; // eslint-disable-line
      const newValue = { ...prev };

      return newValue;
    });

  return (
    <>
      <h2>Add Game to Store</h2>
      <form onSubmit={handleSubmmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={book.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="author"
          name="author"
          value={book.author}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="pages"
          name="pages"
          value={book.pages}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default BooksForm;
