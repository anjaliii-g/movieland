import React from 'react';
//import { getImageUrl } from '../api/MovieApi';

const MovieList = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {movies.map(movie => (
        <div key={movie.id} className="bg-white rounded-lg shadow-md p-2 hover:scale-105 transition-transform duration-300">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full h-80 object-cover"
          />
          <div className="w-full h-80 object-cover rounded-md">
            <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
            <p className=" text-gray-600">{movie.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
