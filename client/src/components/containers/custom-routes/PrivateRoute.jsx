import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';


const PrivateRoute = (props) => {
  console.log('In PrivateRoute', props);
  const { component: Component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={
        routeProps => {
          if (auth.user) {
            return <Component {...routeProps} />;
          }
          return <Redirect to="/home" />;
        }
      }
    />
  );
};

export default PrivateRoute;