import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiUser, FiBook, FiFileText, FiArrowLeft } from 'react-icons/fi';
import { Book } from '../../interfaces/book';
import { addBook } from '../../redux/books';
import { useAppDispatch } from '../../redux/hooks';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import { useToast } from '../../hooks/toast';

interface AddFormData {
  title: string;
  author: string;
  pages: number;
}

const AddBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSave = useCallback(
    ({ title, author, pages }) => {
      const book: Book = {
        id: uuidv4(),
        title,
        author,
        pages,
        rented: false,
      };

      dispatch(addBook(book));

      addToast({
        type: 'success',
        title: 'Book',
        description: 'Book successfully saved',
      });

      history.push('/books');
    },
    [addToast, dispatch, history],
  );

  const handleSubmmit = useCallback(
    async (data: AddFormData) => {
      try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          title: Yup.string().required('Title is required'),
          author: Yup.string().required('Author is required'),
          pages: Yup.number()
            .integer()
            .min(1, 'Number of pages must be more than 0')
            .required('Number of pages are required'),
        });

        await schemaValidation.validate(data, { abortEarly: false });

        handleSave(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleSave],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmmit}>
            <h1>New Book</h1>
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
// FiDollarSign
export default AddBook;
