import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Books from '../pages/Books';
import AddBook from '../pages/AddBook';
import EditBook from '../pages/EditBook';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Books} />
    <Route path="/add-book" component={AddBook} />
    <Route path="/edit-book/:id" component={EditBook} />
  </Switch>
);
export default Routes;
