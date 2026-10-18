import { Navigate } from 'react-router-dom';
import { signUp } from '../../api/authService';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { selectIsAuth, useAuthStore } from '../../stores/authStore';
import type { AuthDataType } from '../../types';

export const SignUpPage = () => {
  const isAuth = useAuthStore(selectIsAuth);
  const mode = 'signUpMode';
  const onSubmitData = (data: AuthDataType) => {
    signUp(data);
  };
  return (
    <>
      {!isAuth ? (
        <div className="px-4">
          <h1 className="text-center text-2xl sm:text-4xl md:text-5xl mb-8">
            sign Up
          </h1>
          <AuthForm mode={mode} onSubmitData={onSubmitData} />
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};
