import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Books from '../pages/Books';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/books" exact component={Books} />
    <Route path="/books/add" exact component={AddBook} />
    <Route path="/books/edit/:id" exact component={EditBook} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);
export default Routes;
