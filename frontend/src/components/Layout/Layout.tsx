import { Navbar } from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
