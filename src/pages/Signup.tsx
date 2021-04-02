import * as hookFormResolver from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { AuthForm } from '../components/AuthForm';
import { FormInput } from '../components/FormInput';
import { useAlertStore, useAuthStore } from '../stores';

interface SignupFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const signupSchema: yup.SchemaOf<SignupFormInput> = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 주소를 입력해주세요.')
    .required('이메일 주소를 입력해주세요.'),
  password: yup
    .string()
    .min(6, '6자 이상의 비밀번호를 입력해주세요.')
    .required('비밀번호를 입력해주세요.'),
  confirmPassword: yup
    .string()
    .test({
      name: 'confirmPassword',
      message: '비밀번호가 일치하지 않습니다.',
      test(value) {
        return this.parent.password === value;
      },
    })
    .required('비밀번호를 다시 한 번 입력해주세요.'),
});

export const Signup = () => {
  const { signup, isAuthLoading } = useAuthStore();
  const { addAlert } = useAlertStore();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm<SignupFormInput>({
    resolver: hookFormResolver.yupResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(
    ({ email, password }) => {
      signup(email, password).then(() => history.push('/'));
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
      <AuthForm
        onSubmit={onSubmit}
        title="sign up"
        isAuthLoading={isAuthLoading}
      >
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
          label="비밀번호 (6자리 이상)"
          register={register}
          error={!!errors.password}
          disabled={isAuthLoading}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="비밀번호 확인"
          register={register}
          error={!!errors.confirmPassword}
          disabled={isAuthLoading}
        />
      </AuthForm>

      <p>
        이미 계정이 있다면
        <Link
          to="/login"
          className="ml-2 font-semibold text-blue-600 focus-ring"
        >
          로그인
        </Link>
      </p>
    </div>
  );
};
