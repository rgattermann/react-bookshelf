import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Books from '../pages/Books';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login';

// TODO: create page 404
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <PrivateRoute path="/books" exact component={Books} />
    <PrivateRoute path="/books/add" exact component={AddBook} />
    <PrivateRoute path="/books/edit/:id" exact component={EditBook} />
    <PrivateRoute path="*" exact component={Login} />
  </Switch>
);
export default Routes;
