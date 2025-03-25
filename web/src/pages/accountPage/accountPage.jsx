import React,{useState} from "react";
import ProfilePage from "../profilePage/profilePage";
import ChatListPage from "../chatListPage/chatListPage";
import styles from "./accountPage.module.css";

const AccountPage = () => {
    const [activePage, setActivePage] = useState('profile');

    return (
      <div className={styles["account-container"]}>

        <aside className={styles.sidebar}>
          <button 
          onClick={() => setActivePage('profile')}
          className={styles.button}
          >
            Mi Perfil
          </button>
          {/*<button 
          onClick={() => setActivePage('chats')}
          className={styles.button}
          >
          Mis Chats
          </button>*/}
        </aside>
  
        {/* Contenido dinámico */}
        <main style={{ flex: 1, padding: '20px' }}>
          {activePage === 'profile' && <ProfilePage />}
          {activePage === 'chats' && <ChatListPage />}
        </main>
      </div>
    );
  };

export default AccountPage;
