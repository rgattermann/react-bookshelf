import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../interfaces/user';
import { userAuthenticated, userNotAuthenticated } from '../../redux/auth';
import { useAppDispatch } from '../../redux/hooks';
import {login as loginService} from '../../services/auth';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  // TODO: Verify is loogged, redirect to books or dashboard

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const loginSucceeded = (isValid: boolean) => {
    if (isValid) {
      dispatch(userAuthenticated());
      history.push('/books');
    } else {
      dispatch(userNotAuthenticated());
    }
  };

  const handleSubmmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setSubmitted(true);
    const user: User = { login, password };

    loginService(user).then(loginSucceeded);
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Bookshelf logo"/>
        <form onSubmit={handleSubmmit}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="E-mail"
            name="username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
