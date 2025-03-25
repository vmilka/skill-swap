import React, { useState } from 'react';
import ChatWindow from '../chatWindow/chatWindow';
import styles from './chatListPage.module.css';

const mockChats = [
  { id: 1, name: 'Juan Pérez' },
  { id: 2, name: 'Ana García' }
];

const ChatListPage = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatTitle}>Mis Chats</h2>
      
      
      <div className={styles.chatList}>
        {mockChats.map(chat => (
          <div key={chat.id} className={styles.chatItem}>
            <h3 className={styles.chatName}>{chat.name}</h3>
            <button 
              onClick={() => setActiveChat(chat)} 
              className={styles.chatButton}
            >
              Abrir Chat
            </button>
          </div>
        ))}
      </div>

      {/* Ventana de chat */}
      {activeChat && <ChatWindow user={activeChat} onClose={() => setActiveChat(null)} />}
    </div>
  );
};

export default ChatListPage;