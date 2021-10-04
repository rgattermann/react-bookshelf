import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import { User } from '../../interfaces/user';
import { userAuthenticated, userNotAuthenticated } from '../../redux/auth';
import { useAppDispatch } from '../../redux/hooks';
import {login as loginService} from '../../services/auth';

import logoImg from '../../assets/logo.svg';

import { Form } from '@unform/web';

import { FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import { useToast } from '../../hooks/toast';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { addToast }  = useToast();

  const handleLogin = useCallback(
    ({ email, password }) => {
      const user: User = { email, password };

      loginService(user).then((isValid: boolean) => {
        if (isValid) {
          dispatch(userAuthenticated());
          history.push("/books");
        } else {
          dispatch(userNotAuthenticated());
          addToast({
            type: "error",
            title: " Authentication error",
            description:
              "There was an error logging in, check the credentials.",
          });
        }
      });
    },
    [addToast, dispatch, history]
  );

  const handleSubmmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          email: Yup.string()
            .required("E-mail is required")
            .email("Enter a valid e-mail"),
          password: Yup.string().min(6, "At least 6 digits"),
        });

        await schemaValidation.validate(data, { abortEarly: false });

        handleLogin(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [handleLogin]
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Bookshelf logo" />

        <Form ref={formRef} onSubmit={handleSubmmit}>
          <h1>Login</h1>
          <Input
            name="email"
            icon={FiMail}
            type="text"
            placeholder="E-mail"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Login</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
