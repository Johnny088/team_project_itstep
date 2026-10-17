import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import type { AuthDataType } from '../../types';

interface AuthProps {
  mode: 'signInMode' | 'signUpMode';
  onSubmitData: (authData: AuthDataType) => void;
}

export const AuthForm = ({ mode, onSubmitData }: AuthProps) => {
  const isSignUpMode = mode === 'signUpMode';

  const initialValues: AuthDataType = isSignUpMode
    ? { email: '', username: '', password: '', confirmPassword: '' }
    : { usernameOrEmail: '', password: '' };

  const authSchema = yup.object().shape({
    usernameOrEmail: !isSignUpMode
      ? yup.string().required('Type your username or email')
      : yup.string().optional(),

    email: isSignUpMode
      ? yup.string().email('use correct email')
      : yup.string().optional(),

    username: isSignUpMode
      ? yup
          .string()
          .min(4, 'at least charachters')
          .max(20, 'no more twenty charachters')
      : yup.string().optional(),

    password: yup.string().min(6, 'at least 6 characters'),

    confirmPassword: isSignUpMode
      ? yup
          .string()
          .oneOf([yup.ref('password')], 'Passwords must match')
          .required('Please confirm your password')
      : yup.string().optional(),
  });

  const inputClass =
    'mt-1 block w-full text-sm px-3 h-10 bg-slate-800 border border-slate-700 text-slate-100 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500';
  const labelClass = 'block text-sm font-medium text-slate-300';

  const handleSubmit = (values: AuthDataType) => {
    onSubmitData(values);
  };

  return (
    <Formik
      enableReinitialize
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={authSchema}
    >
      <Form className="max-w-md mx-auto mt-8 p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-4 text-slate-100">
        {!isSignUpMode && (
          <label className={labelClass}>
            Username or Email
            <Field type="text" name="usernameOrEmail" className={inputClass} />
            <ErrorMessage
              name="usernameOrEmail"
              className="text-red-700 text-sm"
              component="p"
            />
          </label>
        )}

        {isSignUpMode && (
          <label className={labelClass}>
            Username
            <Field type="text" name="username" className={inputClass} />
            <ErrorMessage
              name="username"
              className="text-red-700 text-sm"
              component="p"
            />
          </label>
        )}

        {isSignUpMode && (
          <label className={labelClass}>
            Email
            <Field type="email" name="email" className={inputClass} />
            <ErrorMessage
              name="email"
              className="text-red-700 text-sm"
              component="p"
            />
          </label>
        )}

        <label className={labelClass}>
          Password
          <Field type="password" name="password" className={inputClass} />
          <ErrorMessage
            name="password"
            className="text-red-700 text-sm"
            component="p"
          />
        </label>

        {isSignUpMode && (
          <label className={labelClass}>
            Confirm Password
            <Field
              type="password"
              name="confirmPassword"
              className={inputClass}
            />
            <ErrorMessage
              name="confirmPassword"
              className="text-red-700 text-sm"
              component="p"
            />
          </label>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-700 active:bg-red-800 text-white rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 duration-300"
        >
          {isSignUpMode ? 'Sign Up' : 'Sign In'}
        </button>
      </Form>
    </Formik>
  );
};
