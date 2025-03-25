import Navbar from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
