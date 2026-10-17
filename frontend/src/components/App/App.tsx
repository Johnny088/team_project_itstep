import { Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { HomePage } from '../../Pages/HomePage/HomePage';
import { SignInPage } from '../../Pages/SignInPage/SignInPage';
import { SignUpPage } from '../../Pages/SignUpPage/SignUpPage';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/auth/sign-in" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
};
