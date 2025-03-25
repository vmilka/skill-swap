import React from 'react';
import defaultAvatar from '../assets/default-avatar.jpg'

const Avatar = ({ src, size = 50 }) => {
  return (
    <img
      src={src || defaultAvatar}
      alt="Avatar"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  );
};

export default Avatar;
