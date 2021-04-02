import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuthStore } from '../stores';

interface Props extends RouteProps {
  type: 'auth' | 'private';
}

export const RouteWithAuthState = ({ component, type, ...rest }: Props) => {
  const { user } = useAuthStore();
  const route = <Route {...rest} component={component} />;

  if (type === 'private') {
    if (user) {
      return route;
    }

    return <Redirect to="/login" />;
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return route;
};
