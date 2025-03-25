import React, { useState, useEffect } from 'react';

import styles from './chatWindow.module.css'
import * as skillApi from "../../services/api-service";

const ChatWindow = ({ user, onClose, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {

    skillApi.messageDetail(receiver)
      .then((res) => {
        setMessages(res)
       
      })
      .catch((error) => console.log(error.response));

  }, []);


  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'yo' }]);

      try {
        const ms = {
          content: newMessage,
          receiver: receiver
        }
        await skillApi.messagesSend(ms)
      } catch (error) {
        console.log(error)
      }

      setNewMessage('');
    }
  };

  return (
    <div className={styles.chatWindow}>
      {/* Encabezado del chat */}
      <div className={styles.chatHeader}>
        <strong>Chat con {user.name}</strong>
        <button onClick={onClose} className={styles.closeButton}>✕</button>
      </div>

      {/* Área de mensajes */}
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${msg.sender === 'yo' ? styles.messageSent : ''}`}
          >
            <span className={`${styles.messageText} ${msg.sender === 'yo' ? styles.sent : styles.received}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input y botón */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className={styles.chatInput}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <button onClick={handleSendMessage} className={styles.sendButton}>
        Enviar
      </button>
    </div>
  );
};
export default ChatWindow;
