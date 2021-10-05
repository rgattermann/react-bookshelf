import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserAuthentication } from '../redux/auth';

interface PrivateRouteProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  exact,
  component,
}) => {
  const condition = useSelector(getUserAuthentication);

  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/" exact />
  );
};

export default PrivateRoute;
