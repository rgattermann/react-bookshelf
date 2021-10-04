import React, { useCallback } from "react";
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
import { useToast } from '../../hooks/toast';

const Books: React.FC = () => {
  const history = useHistory();
  const books = useSelector(getBooksSelector);
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const handleRemove = useCallback(
    (id: string, rented: boolean) => {
      if (rented) {
        addToast({
          type: "error",
          title: "Book",
          description: "Book is rented, can't remove it",
        });
      } else {
        dispatch(removeBook(id));
        addToast({
          type: "success",
          title: "Book",
          description: "Book successfully removed",
        });
      }
    },
    []
  );

  const handleRent = useCallback(
    (id: string) => {
      dispatch(updateRentBook(id));
      addToast({
        type: "success",
        title: "Book",
        description: "Book rental updated successfully",
      });
    },
    [addToast]
  );

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
                onClick={() => handleRemove(book.id, book.rented)}
              />
            </BookItem>
          ))}
        </BooksList>
      </Container>
    </>
  );
};

export default Books;
