import React, { useCallback, useRef } from 'react';
import { createSelectorHook } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiPenTool, FiDollarSign, FiSearch } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  getBooksSelector,
  removeBook,
  updateRentBook,
} from '../../redux/books';
import { useAppDispatch } from '../../redux/hooks';
import Header from '../../components/Header';
import {
  Container,
  BooksList,
  TitleContainer,
  SearchContainer,
  BookContent,
  BookItem,
} from './styles';

import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import { RootState } from '../../redux/store';
import Input from '../../components/Input';

interface SearchFormData {
  search?: string;
}

const Books: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const useSelector = createSelectorHook<RootState>();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const booksResults = useSelector(getBooksSelector);

  const handleRemove = useCallback(
    (id: string, rented: boolean) => {
      if (rented) {
        addToast({
          type: 'error',
          title: 'Book',
          description: "Book is rented, can't remove it",
        });
      } else {
        dispatch(removeBook(id));
        addToast({
          type: 'success',
          title: 'Book',
          description: 'Book successfully removed',
        });
      }
    },
    [dispatch, addToast],
  );

  const handleRent = useCallback(
    (id: string, rented: boolean) => {
      if (rented) {
        addToast({
          type: 'error',
          title: 'Book',
          description: "It's not possible to rent a book already rented",
        });
      } else {
        dispatch(updateRentBook(id));
        addToast({
          type: 'success',
          title: 'Book',
          description: 'Book rental updated successfully',
        });
      }
    },
    [addToast, dispatch],
  );

  const handleEdit = useCallback(
    (id: string, rented: boolean) => {
      if (rented) {
        addToast({
          type: 'error',
          title: 'Book',
          description: "It's not possible edit a book already rented",
        });
      } else {
        history.push(`/books/edit/${id}`);
      }
    },
    [addToast, history],
  );

  const handleSearch = useCallback((data: SearchFormData) => {
    if (data?.search) {
      // const searchBooks = useSelector<RootState>(state => getFilteredBooks(state, data.search));
      // setBooksResults(searchBooks.books);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <TitleContainer>
          <h1>Books List</h1>
          <Link to="/books/add">
            <Button type="button">Add book</Button>
          </Link>
        </TitleContainer>
        <SearchContainer>
          <Form ref={formRef} onSubmit={handleSearch}>
            <Input
              name="search"
              icon={FiSearch}
              type="text"
              placeholder="Search"
            />
            <Button type="submit">Search</Button>
          </Form>
        </SearchContainer>
        <BooksList>
          {booksResults.map(book => (
            <BookItem key={book.id}>
              <BookContent>
                <strong>{book.title}</strong>
                <p>{book.author}</p>
                <p>{book.pages} pages</p>
                <p>
                  <strong>Rented: </strong>
                  {book.rented ? 'Yes' : 'No'}
                </p>
              </BookContent>
              <FiPenTool
                title="Edit"
                size={20}
                onClick={() => handleEdit(book.id, book.rented)}
              />
              <FiDollarSign
                title="Rent"
                size={20}
                onClick={() => handleRent(book.id, book.rented)}
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
