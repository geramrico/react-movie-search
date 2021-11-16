import React, { useState } from "react";
import MovieCard from "./MovieCard";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (event) => {
    event.preventDefault();
    const API_KEY = "f3e657ab75482084bf32d8c43db77fce";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { results } = data;
      setMovies(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuery = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie name:
        </label>

        <input className="input" type="text" name="query" placeholder="Search" value={query} onChange={handleQuery} />

        <button className="button">Search</button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
};

export default SearchMovies;
