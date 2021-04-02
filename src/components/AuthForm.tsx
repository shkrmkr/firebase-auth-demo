import React from 'react';
import { Spinner } from './Spinner';

interface Props {
  title: 'login' | 'sign up' | 'reset password' | 'update profile';
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  isAuthLoading: boolean;
}

export const AuthForm = (props: Props) => {
  const { title, onSubmit, children, isAuthLoading } = props;

  return (
    <form onSubmit={onSubmit} className="self-stretch space-y-5">
      <h2 className="text-4xl font-thin capitalize sm:mb-10 sm:text-5xl">
        {title}
      </h2>

      {children}

      <button
        type="submit"
        className="inline-flex w-full gap-2 p-5 text-sm text-white uppercase transition duration-300 transform bg-indigo-500 rounded-sm hover:bg-indigo-400 focus-ring disabled:bg-gray-500 disabled:cursor-wait"
        disabled={isAuthLoading}
      >
        <Spinner isLoading={isAuthLoading} />
        <span>{title}</span>
      </button>
    </form>
  );
};
