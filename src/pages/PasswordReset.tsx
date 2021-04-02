import * as hookFormResolver from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { AuthForm } from '../components/AuthForm';
import { FormInput } from '../components/FormInput';
import { useAlertStore, useAuthStore } from '../stores';

interface ResetPasswordFormInput {
  email: string;
}

const loginSchema: yup.SchemaOf<ResetPasswordFormInput> = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .required('이메일 주소를 입력해주세요'),
});

export const PasswordReset = () => {
  const { resetPassword, isAuthLoading } = useAuthStore();
  const history = useHistory();
  const { addAlert } = useAlertStore();

  const { register, handleSubmit, errors } = useForm<ResetPasswordFormInput>({
    resolver: hookFormResolver.yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(
    ({ email }) => {
      resetPassword(email).then(() => {
        addAlert({
          type: 'success',
          message:
            '입력하신 주소로 비밀번호 재설정 관련 이메일을 발송했습니다. 이메일 보관함을 확인해주세요.',
        });
        history.push('/login');
      });
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
        title="reset password"
        isAuthLoading={isAuthLoading}
      >
        <FormInput
          name="email"
          label="이메일"
          register={register}
          error={!!errors.email}
          disabled={isAuthLoading}
        />
      </AuthForm>

      <Link to="/login" className="block font-semibold text-blue-600">
        로그인
      </Link>
    </div>
  );
};
