import cn from 'classnames';
import React from 'react';
import { FieldElement, FieldValues, Ref } from 'react-hook-form';

interface Props {
  name: string;
  type?: 'text' | 'password';
  label?: string;
  disabled?: boolean;
  error: boolean;
  register: (ref: (FieldElement<FieldValues> & Ref) | null) => void;
}

export const FormInput = (props: Props) => {
  const {
    name,
    type = 'text',
    error,
    register,
    label,
    disabled = false,
  } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="hidden">
        {label || name}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={name}
        placeholder={label || name}
        name={name}
        className={cn(
          'focus-ring w-full p-5 py-2 border-2 border-gray-300 rounded-sm',
          {
            ['border-red-600']: error,
          },
        )}
        ref={register}
      />
    </div>
  );
};
