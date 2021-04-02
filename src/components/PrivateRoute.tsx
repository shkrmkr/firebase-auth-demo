import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuthStore } from '../stores';

export const PrivateRoute = ({ component, ...rest }: RouteProps) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} component={component} />;
};
