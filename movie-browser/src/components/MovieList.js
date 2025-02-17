import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const MovieList = ({ movies, toggleFavorite, favorites }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {movies.map(movie => {
        const isFavorite = favorites.some(fav => fav.id === movie.id);
        return (
          <div key={movie.id} className="bg-white rounded-lg shadow-md p-2.5 hover:scale-105 transition-transform duration-300 relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
            <p className="text-gray-600">{movie.release_date?.split('-')[0]}</p>
            <p className="text-yellow-500 font-bold mt-1">
                {(movie.vote_average.toFixed(1))}
                <span className="ml-1 text-yellow-400">⭐</span>
            </p>
            <div
              onClick={() => toggleFavorite(movie)}
              className="absolute top-2 right-2 cursor-pointer text-2xl"
            >
              {isFavorite ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-black" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
