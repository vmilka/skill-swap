import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Comments from '../../components/comments';
import ChatWindow from '../chatWindow/chatWindow';
import Rating from '../../components/rating';
import * as skillApi from "../../services/api-service";
import { useAuthContext } from '../../contexts/auth-context';

const mockUsers = [
  { id: 1, name: 'Juan Pérez', skills: ['JavaScript', 'React'], location: 'Madrid' },
  { id: 2, name: 'Ana García', skills: ['Python', 'Django'], location: 'Barcelona' }
];

const userRatings = [
  { userId: 2, rating: 4 },
  { userId: 3, rating: 5 },
  { userId: 4, rating: 3 },
];


const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUsers] = useState(mockUsers.find(u => u.id === parseInt(id)));
  const [ratings, setRatings] = useState();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const ctx = useAuthContext();

  const [currentUser, setCurrentUser] = useState({
    id: ctx.user.id,
    name: ctx.user.name
  });

  useEffect(() => {
    skillApi.skillDetail(id)
      .then((skills) => setUsers(skills))
      .catch((error) => console.log(error.response));
  }, []);

  useEffect(() => {
    skillApi.ratingDetail(id)
      .then((rating) => setRatings(rating))
      .catch((error) => console.log(error.response?.status));
  }, []);

  const handleStartChat = () => {
    setIsChatOpen(true); // Abre la mini-ventana de chat
  };

  const handleCloseChat = () => {
    setIsChatOpen(false); // Cierra la mini-ventana de chat
  };


  if (!user) return <p>Usuario no encontrado</p>;

  return (
    <div className="max-w-4xl mx-5 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-semibold mb-4 ">{user.name}</h1>
        <p className="text-lg text-gray-600 mb-2 ">
          <strong>Habilidades:</strong> {user.skills.join(', ')}
        </p>
        <p className="text-lg text-gray-600 mb-4 ">
          <strong>Ubicación:</strong> {user.location}
        </p>
        {/*<Rating ratings={4} canVote={false} />*/}
        <button
          onClick={handleStartChat}
          className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
        >
          Iniciar Chat
        </button>
      </div>
      {/* Componente de comentarios */}
      <Comments user={user}/>

      {/* Mini-ventana de chat */}
      {isChatOpen && <ChatWindow user={user} onClose={handleCloseChat} receiver={id} />}
    </div>
  );
};

export default UserProfilePage;
