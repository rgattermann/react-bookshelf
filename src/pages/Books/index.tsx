import React, { useState } from "react";

// import { Container, Content, Background } from './styles';

const initialBooks = [
  { id: "1", title: "1984", author: "George Orwell", pages: 0, rented: false },
  { id: "2", title: "1984", author: "George Orwell", pages: 0, rented: false },
];

// interface BooksProps {}

interface Book {
  id: string;
  title: string;
  author: string;
  pages: number;
  rented: boolean;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const simpleBook = {
    id: "3",
    title: "PHP Moderno",
    author: "xxx",
    pages: 0,
    rented: false,
  };

  return (
    <div>
      <h2>Books List</h2>
      {books.map((book) => (
        <div key={book.id}>
          <span>{`${book.author}: ${book.title}`}</span>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setBooks((prevBooks) => [simpleBook, ...prevBooks])}
      >
        Add Book
      </button>
    </div>
  );
};

export default Books;
