import { Navigate } from 'react-router-dom';
import { signIn } from '../../api/authService';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { selectIsAuth, useAuthStore } from '../../stores/authStore';
import type { AuthDataType } from '../../types';

export const SignInPage = () => {
  const isAuth = useAuthStore(selectIsAuth);
  const mode = 'signInMode';
  const onSubmitData = (data: AuthDataType) => {
    signIn(data);
  };
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <div className="px-4">
          <h1 className="text-center text-2xl sm:text-4xl md:text-5xl mb-8">
            Sing In
          </h1>
          <AuthForm mode={mode} onSubmitData={onSubmitData} />
        </div>
      )}
    </>
  );
};
