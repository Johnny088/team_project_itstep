import { signIn } from '../../api/authService';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import type { AuthDataType } from '../../types';

export const SignInPage = () => {
  const mode = 'signInMode';
  const onSubmitData = (data: AuthDataType) => {
    // console.log(data);
    signIn(data);
  };
  return (
    <div className="px-4">
      <h1 className="text-center text-2xl sm:text-4xl md:text-5xl mb-8">
        Sing In
      </h1>
      <AuthForm mode={mode} onSubmitData={onSubmitData} />
    </div>
  );
};
