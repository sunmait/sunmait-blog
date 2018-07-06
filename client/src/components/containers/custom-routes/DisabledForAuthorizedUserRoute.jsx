import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const DisabledForAuthorizedUserRoute = (props) => {
  const { component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={
        routeProps => {
          if (!auth.user) {
            return <Component {...routeProps} />;
          }

          return <Redirect to="/main" />;
        }
      }
    />
  );
};

export default DisabledForAuthorizedUserRoute;