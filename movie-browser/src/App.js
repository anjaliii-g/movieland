import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Favorites from './components/Favorites';
import '@fontsource/pacifico'; 

const API_KEY = '312a3897bb73943ebc514ea5e3cf3507';
const BASE_URL = 'https://api.themoviedb.org/3';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  //Load Favorites from Local Storage on first render
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save Favorites to Local Storage when changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  //Fetch movies function
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

  //Load movies on component mount and when query or page changes
  useEffect(() => {
    const loadMovies = async () => {
      const movieData = await fetchMovies(query, page);
      setMovies(prevMovies => (page === 1 ? movieData : [...prevMovies, ...movieData]));
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

  //To add/remove in favorites
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <Router>
      <div className='bg-gray-100'>{/* Main Heading */}
        <h1 className="text-5xl text-center pt-4 font-bold  mb-4 text-gray-800" style={{ fontFamily: 'Pacifico, cursive' }}>
            Movie Browser
          </h1>

          {/* Header Navigation */}
          <div className="bg-gray-800 text-white py-2  flex justify-center">
            <Link to="/" className="mx-2 bg-gray-600 px-3 py-1 rounded-full hover:bg-gray-500 transition">Home</Link>
            <Link to="/favorites" className="mx-2 bg-gray-600 px-3 py-1 rounded-full hover:bg-gray-500 transition">Favorites</Link>
          </div>
      </div>
      
      <div className=" mx-auto px-4  bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar query={query} setQuery={setQuery} setPage={setPage} />
                <MovieList movies={movies} toggleFavorite={toggleFavorite} favorites={favorites} />
              </>
            }
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
