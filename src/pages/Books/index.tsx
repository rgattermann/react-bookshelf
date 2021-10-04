import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getBooksSelector,
  removeBook,
  updateRentBook,
} from "../../redux/books";
import { useAppDispatch } from "../../redux/hooks";
import Header from "../../components/Header";
import {
  Container,
  BooksList,
  TitleContainer,
  BookContent,
  BookItem,
} from "./styles";
import {
  FiTrash2,
  FiPenTool,
  FiDollarSign,
} from "react-icons/fi";
import Button from '../../components/Button';

const Books: React.FC = () => {
  const history = useHistory();
  const books = useSelector(getBooksSelector);
  const dispatch = useAppDispatch();

  const handleRemove = useCallback((id: string) => {
    // verify if rented is true, no delete
    // emit toast
    dispatch(removeBook(id));
  }, []);

  const handleRent = useCallback((id: string) => {
    dispatch(updateRentBook(id));
  }, []);

  const handleEdit = useCallback((id: string) => {
    history.push(`/books/edit/${id}`);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <TitleContainer>
          <h1>Books List</h1>
          <Link to="/books/add">
            <Button type="submit">Add book</Button>
          </Link>
        </TitleContainer>
        <BooksList>
          {books.map((book) => (
            <BookItem key={book.id}>
              <BookContent>
                <strong>{book.title}</strong>
                <p>{book.author}</p>
                <p>{book.pages} pages</p>
                <p>
                  <strong>Rented: </strong>
                  {book.rented ? "Yes" : "No"}
                </p>
              </BookContent>
              <FiPenTool
                title="Edit"
                size={20}
                onClick={() => handleEdit(book.id)}
              />
              <FiDollarSign
                title="Rent"
                size={20}
                onClick={() => handleRent(book.id)}
              />
              <FiTrash2
                title="Remove"
                size={20}
                onClick={() => handleRemove(book.id)}
              />
            </BookItem>
          ))}
        </BooksList>
      </Container>
    </>
  );
};

export default Books;
