import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

// Simulamos una API de ratings
const mockRatings = [
  { userId: 2, rating: 4 },
  { userId: 2, rating: 5 },
  { userId: 2, rating: 3 }
];

const Rating = ({ ratings, canVote }) => {
  const [rating, setRating] = useState(ratings); // Puntuación dada por el usuario actual
  const [averageRating, setAverageRating] = useState(0); // Media de puntuaciones
  const [hasVoted, setHasVoted] = useState(!canVote); // Para saber si el usuario ya votó

  // Calcula la media de votos
  // useEffect(() => {
  //   const userRatings = mockRatings.filter(r => r.userId === userId);
  //   const total = userRatings.reduce((sum, r) => sum + r.rating, 0);
  //   const average = userRatings.length > 0 ? total / userRatings.length : 0;
  //   setAverageRating(average.toFixed(1));

  //   // Verifica si el usuario actual ya votó
  //   const userVote = userRatings.find(r => r.userId === currentUserId);
  //   if (userVote) {
  //     setRating(4);
  //     setHasVoted(true);
  //   }
  //  }, [userId, currentUserId]);

  // Maneja la votación
  const handleRating = (rate) => {
    //   if (isOwnProfile || hasVoted) return; // No puedes votar en tu perfil ni dos veces

    //   // Simulamos guardar el voto
    //   mockRatings.push({ userId, rating: rate });
console.log(rate)
    setRating(rate);
    //   setHasVoted(true);

    //   // Recalcula la media después de votar
    //   const userRatings = mockRatings.filter(r => r.userId === userId);
    //   const total = userRatings.reduce((sum, r) => sum + r.rating, 0);
    //   const average = total / userRatings.length;
    //   setAverageRating(average.toFixed(1));
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            color={star <= rating ? '#ffd700' : '#e4e5e9'}
            onClick={() => canVote && handleRating(star)}
            style={{ cursor: !canVote ? 'default' : 'pointer' }}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">({averageRating})</span>
    </div>
  );
};

export default Rating;
