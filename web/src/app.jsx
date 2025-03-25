import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/UI/navbar';
import Footer from './components/UI/footer';
import Layout from './components/UI/layout';
import LoginPage from './pages/loginPage/loginPage';
import HomePage from './pages/homePage/homePage';
import RegisterPage from './pages/registerPage/registerPage';
import ProfilePage from './pages/profilePage/profilePage';
import AccountPage from './pages/accountPage/accountPage';
import UserProfilePage from './pages/userProfilePage/userProfilePage';
import AboutPage from './pages/aboutPage/aboutPage';
import ChatPage from './pages/chatListPage/chatListPage';
import './app.css';
import { PrivateRoute } from "./guards";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas sin navbar */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Páginas con navbar usando el layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
