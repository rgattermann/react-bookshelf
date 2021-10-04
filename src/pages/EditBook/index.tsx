import React, { useState, useCallback, useRef } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Book } from "../../interfaces/book";
import { addBook } from "../../redux/books";
import { useAppDispatch } from "../../redux/hooks";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Form } from "@unform/web";
import { FiUser, FiBook, FiFileText, FiArrowLeft } from "react-icons/fi";

import { Container, Content } from "./styles";
import getValidationErrors from "../../utils/getValidationErrors";
import Header from "../../components/Header";
import CheckboxSlider from "../../components/CheckboxSlider";
import { createSelectorHook } from 'react-redux';
import { RootState } from '../../redux/store';

interface BookFormData {
  title: string;
  author: string;
  pages: number;
}

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { id: bookId }: { id: string } = useParams();

  const useSelector = createSelectorHook<RootState>();

  const bookFromStore = useSelector((state) =>
    state.books.find((book) => book.id === bookId)
  );

  const handleSave = useCallback(({ title, author, pages }) => {
    const book: Book = {
      id: bookId,
      title,
      author,
      pages,
      rented: false,
    };

    dispatch(addBook(book));

    history.push("/books");
  }, []);

  const handleSubmmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schemaValidation = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        author: Yup.string().required("Author is required"),
        pages: Yup.number()
          .integer()
          .min(1, "Number of pages must be more than 0")
          .required("Number of pages are required"),
      });

      await schemaValidation.validate(data, { abortEarly: false });

      handleSave(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form
            ref={formRef}
            initialData={{
              title: bookFromStore?.title,
              author: bookFromStore?.author,
              pages: bookFromStore?.pages,
            }}
            onSubmit={handleSubmmit}
          >
            <h1>Edit Book</h1>
            <Input name="title" icon={FiBook} type="text" placeholder="Title" />
            <Input
              name="author"
              icon={FiUser}
              type="text"
              placeholder="Author"
            />
            <Input
              name="pages"
              icon={FiFileText}
              type="number"
              placeholder="Number of pages"
            />
            <Button type="submit">Save</Button>
          </Form>

          <Link to="/books">
            <FiArrowLeft size={20} />
            Back to books
          </Link>
        </Content>
      </Container>
    </>
  );
};
//FiDollarSign
export default AddBook;
