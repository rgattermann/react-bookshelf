import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../interfaces/book';
import { addBook } from '../../redux/books';
import { useAppDispatch } from '../../redux/hooks';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setSubmitted(true);

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
