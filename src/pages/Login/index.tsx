import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../interfaces/user';
import { userAuthenticated, userNotAuthenticated } from '../../redux/auth';
import { useAppDispatch } from '../../redux/hooks';
import {login as loginService} from '../../services/auth';

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
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmmit}>
        <label htmlFor="title">username</label>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
