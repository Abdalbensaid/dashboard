import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // vérifie si connecté

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
