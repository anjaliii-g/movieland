import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

const API_KEY = '312a3897bb73943ebc514ea5e3cf3507';
const BASE_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // Function to fetch movies
  const fetchMovies = async (searchQuery, pageNumber) => {
    try {
      const endpoint = searchQuery 
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}` 
        : `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${pageNumber}`;

      const response = await axios.get(endpoint);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  // Load movies on component mount and when query or page changes
  useEffect(() => {
    const loadMovies = async () => {
      const movieData = await fetchMovies(query, page);
      setMovies(prevMovies => page === 1 ? movieData : [...prevMovies, ...movieData]);
    };

    loadMovies();
  }, [query, page]);

  // Here we are handling the scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 min-h-screen bg-gray-100">
      <h1 className="text-4xl text-center font-bold my-8">Movie Browser</h1>
      <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
