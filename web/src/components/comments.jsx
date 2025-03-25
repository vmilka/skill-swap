import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/auth-context';
import * as skillApi from "../services/api-service";
import Rating from '../components/rating';

const Comments = ({ user, ratings }) => {
  const ctx = useAuthContext();
  const [comments, setComments] = useState(ratings);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: 123, name: 'Mi Usuario' });

  if (!user) return <p>No se encontró el usuario</p>;


  useEffect(() => {
    setComments(ratings);
  }, [ratings]);

  useEffect(() => {
    const cUser = {
      id: ctx.user.id,
      name: ctx.user.name
    };
    setCurrentUser(cUser);
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [
        ...comments || [],
        {
          id: Date.now(),
          text: newComment,
          author: currentUser.name,
          authorId: currentUser.id,
        },
      ];
      const newComent =
      {
        rating: 3,
        comment: newComment,
        ratedUser: user.id
      }

      skillApi.ratingCreate(newComent)
        .then((skills) => { })
        .catch((error) => console.log(error.response));


      setComments(updatedComments);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId, authorId) => {
    if (authorId === currentUser.id && comments !== undefined) {
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
    }
  };

  const isOwnProfile = user.id === currentUser.id;

  return (
    <div className="max-w-3xl mx-5  p-4 ">

      {/* Sección de comentarios en formato card */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-3">Comentarios</h3>
        {comments !== undefined && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                {/* Barra superior con usuario y botón eliminar */}
                <div className="comment-bar px-4 py-2 text-sm font-medium flex items-center gap-6 ">
                  <span className="font-semibold mx-1">{comment.author}</span>
                  {comment.authorId === currentUser.id && (
                    <button
                      onClick={() => handleDeleteComment(comment.id, comment.authorId)}
                      className="delete-button px-1 py-1 mx-5 text-xs"
                      style={{ marginLeft: 'auto', padding: '4px 8px', fontSize: '0.8rem' }}
                    >
                      ✕ Eliminar
                    </button>
                  )}
                </div>
                {/* Texto del comentario */}
                <div className="comment-box p-3">
                  {comment.text}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Aún no hay comentarios.</p>
        )}
      </div>

      {/* Input para agregar comentarios (solo en perfiles ajenos) */}
      {!isOwnProfile && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            className="flex-1 p-2 mb-2 border rounded-lg text-sm"
          />
          <div>
            <button
              onClick={handleAddComment}
              className="bg-palatinato text-white px-3 py-2 rounded"
            >
              Añadir
            </button>
            {/*<Rating ratings={0} canVote={true} />*/}
          </div>

        </div>
      )}
    </div>
  );
};

export default Comments;
