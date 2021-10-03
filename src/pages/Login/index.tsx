import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // TODO: Verify is loogged, redirect to books or dashboard

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // assim que for chamado em tela
  //useEffect(() => {

  //}, []);

  const loginSucceeded = (isValid: boolean) => {
    if (isValid) {
      dispatch(userAuthenticated());
      history.push('/books');
    } else {
      dispatch(userNotAuthenticated());
    }
  };

  const handleSubmmit = (data: object): void => {
    console.log(data);
  };

  /*const handleSubmmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setSubmitted(true);
    const user: User = { login, password };

    loginService(user).then(loginSucceeded);
  };*/

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Bookshelf logo" />

        <Form onSubmit={handleSubmmit}>
          <h1>Login</h1>
          <Input
            name="username"
            icon={FiMail}
            type="text"
            placeholder="E-mail"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
