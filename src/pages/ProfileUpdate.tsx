import * as hookFormResolver from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { AuthForm } from '../components/AuthForm';
import { FormInput } from '../components/FormInput';
import { useAlertStore, useAuthStore } from '../stores';

interface ProfileUpdateFormInput {
  originalPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const profileUpdateSchema: yup.SchemaOf<ProfileUpdateFormInput> = yup
  .object()
  .shape({
    originalPassword: yup.string().required('기존 비밀번호를 입력해주세요.'),
    newPassword: yup
      .string()
      .min(6, '6자 이상의 비밀번호를 입력해주세요.')
      .required('새로운 비밀번호를 입력해주세요.'),
    confirmPassword: yup
      .string()
      .test({
        name: 'confirmPassword',
        message: '비밀번호가 일치하지 않습니다.',
        test(value) {
          return this.parent.newPassword === value;
        },
      })
      .required('비밀번호를 다시 한 번 입력해주세요.'),
  });

export const ProfileUpdate = () => {
  const { updatePassword, isAuthLoading, user } = useAuthStore();
  const history = useHistory();
  const { addAlert } = useAlertStore();

  const { register, handleSubmit, errors } = useForm<ProfileUpdateFormInput>({
    resolver: hookFormResolver.yupResolver(profileUpdateSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(
    ({ originalPassword, newPassword }) => {
      updatePassword(originalPassword, newPassword).then(() => {
        addAlert({
          type: 'success',
          message: '비밀번호를 성공적으로 변경하였습니다.',
        });
        history.push('/');
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
        title="update profile"
        isAuthLoading={isAuthLoading}
      >
        <div className="w-full p-5 py-2 border-2 border-gray-300 rounded-sm">
          {user?.email}
        </div>

        <FormInput
          type="password"
          name="originalPassword"
          label="기존 비밀번호"
          register={register}
          error={!!errors.originalPassword}
          disabled={isAuthLoading}
        />

        <FormInput
          type="password"
          name="newPassword"
          label="새로운 비밀번호 (6자리 이상)"
          register={register}
          error={!!errors.newPassword}
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

      <Link
        to="/"
        className="inline-block font-semibold text-blue-600 focus-ring"
      >
        취소
      </Link>
    </div>
  );
};
