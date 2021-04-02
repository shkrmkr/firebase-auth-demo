import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthStore } from '../stores';

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const history = useHistory();

  const handleLogout = () => {
    logout().then(() => history.push('/login'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-5">
      <div className="flex flex-col w-full max-w-md gap-5 p-5 border-2">
        <h2 className="text-4xl font-thin sm:text-5xl">Profile</h2>
        <p>
          <span className="font-semibold">Email:</span> {user?.email}
        </p>

        <Link
          className="px-5 py-3 font-semibold text-center text-white uppercase transition duration-500 bg-indigo-500 rounded-sm hover:bg-indigo-400 active:bg-indigo-600 focus-ring"
          to="/update-profile"
        >
          update profile
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="font-semibold text-blue-600 focus-ring"
      >
        logout
      </button>
    </div>
  );
};
