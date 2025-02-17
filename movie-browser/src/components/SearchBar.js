import React from 'react';

const SearchBar = ({ query, setQuery, setPage }) => {
  const handleChange = (e) => {
    setQuery(e.target.value);
    setPage(1);  
  };

  return (
    <div className="text-center mb-6">
    <input 
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search movies..."
      className="w-full sm:w-3/4 md:w-1/2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    </div>
   
  );
};

export default SearchBar;
