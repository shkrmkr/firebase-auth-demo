import * as hookFormResolver from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { AuthForm } from '../components/AuthForm';
import { FormInput } from '../components/FormInput';
import { useAlertStore, useAuthStore } from '../stores';

interface LoginFormInput {
  email: string;
  password: string;
}

const loginSchema: yup.SchemaOf<LoginFormInput> = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 주소를 입력해주세요.')
    .required('이메일 주소를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

export const Login = () => {
  const { login, isAuthLoading } = useAuthStore();
  const { addAlert } = useAlertStore();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm<LoginFormInput>({
    resolver: hookFormResolver.yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(
    ({ email, password }) => {
      login(email, password).then(() => history.push('/'));
    },
    (errors) => {
      Object.values(errors).forEach((field) => {
        if (field?.message) {
          addAlert({ type: 'error', message: field.message });
        }
      });
    },
  );

  return (
    <div className="max-w-md px-5 mx-auto my-5 space-y-5 sm:my-10 sm:space-y-10">
      <AuthForm onSubmit={onSubmit} title="login" isAuthLoading={isAuthLoading}>
        <FormInput
          name="email"
          label="이메일"
          register={register}
          error={!!errors.email}
          disabled={isAuthLoading}
        />
        <FormInput
          type="password"
          name="password"
          label="비밀번호"
          register={register}
          error={!!errors.password}
          disabled={isAuthLoading}
        />
      </AuthForm>

      <div>
        <Link
          to="/reset-password"
          className="font-semibold text-blue-600 focus-ring"
        >
          비밀번호 재설정
        </Link>
        <p>
          아직 계정이 없다면
          <Link
            to="/signup"
            className="ml-2 font-semibold text-blue-600 focus-ring"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};
