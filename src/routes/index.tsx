import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Books from '../pages/Books';
import AddBook from '../pages/AddBook';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Books} />
    <Route path="/add-book" exact component={AddBook} />
  </Switch>
);

export default Routes;
