import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, poster_path, release_date } = movie;
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-96 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
