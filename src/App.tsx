import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Alert } from './components/Alert';
import { RouteWithAuthState } from './components/RouteWithAuthState';
import { Spinner } from './components/Spinner';
import { auth } from './firebase';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { PasswordReset } from './pages/PasswordReset';
import { ProfileUpdate } from './pages/ProfileUpdate';
import { Signup } from './pages/Signup';
import { useAuthStore } from './stores/authStore';

export const App = () => {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        setUser(user);
        setIsLoading(false);
      }),
    [setUser],
  );

  if (isLoading) {
    return (
      <div className="grid h-screen place-content-center">
        <Spinner
          twColorClass="text-blue-600"
          twHeightAndWidthClass="h-64 w-64"
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Alert />
      <Switch>
        <RouteWithAuthState
          type="private"
          exact
          path="/"
          component={Dashboard}
        />
        <RouteWithAuthState
          type="private"
          path="/update-profile"
          component={ProfileUpdate}
        />
        <RouteWithAuthState type="auth" path="/signup" component={Signup} />
        <RouteWithAuthState type="auth" path="/login" component={Login} />
        <RouteWithAuthState
          type="auth"
          path="/reset-password"
          component={PasswordReset}
        />
      </Switch>
    </BrowserRouter>
  );
};
