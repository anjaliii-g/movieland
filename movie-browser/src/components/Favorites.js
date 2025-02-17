import React from 'react';
import MovieList from './MovieList';

const Favorites = ({ favorites, toggleFavorite }) => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold pt-2 mb-2">Favorite Movies ❤️</h2>
      {favorites.length > 0 ? (
        <MovieList movies={favorites} toggleFavorite={toggleFavorite} favorites={favorites} />
      ) : (
        <p className="text-center text-gray-600">No favorites added yet!</p>
      )}
    </div>
  );
};

export default Favorites;
