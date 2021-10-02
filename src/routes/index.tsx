import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Books from '../pages/Books';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Books} />
  </Switch>
);

export default Routes;
