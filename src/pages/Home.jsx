import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchSkeleton from '../components/SearchSkeleton';
import axios from 'axios';
import "../moviestyle.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMovies () {
    try {
      setLoading(true);
    const { data } = await axios.get
    (`https://www.omdbapi.com/?apikey=db4e97d3&s=star`)

    const randomMovies = (data.Search || [])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setMovies(randomMovies);
    } catch (error) {
      console.error("couldn't find movies", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  function onSearch() {
    movieSearch(searchMovies)
  }

  async function movieSearch (title) {
    const { data } = await axios.get
    (`https://www.omdbapi.com/?apikey=db4e97d3&s=${title}`)
    setSearchMovies(data);
  }

  function onSearchKeyPress(key) {
    if (key === 'Enter')
      onSearch()
  }

  return (
    <>
        <Navbar />
        {loading ? (
          <SearchSkeleton />
        ) : (
          <>
        <div className="movie__search">
          <input 
            type="text" 
            id="Title" 
            placeholder="Search by Title" 
            onChange={(event) => setSearchMovies(event.target.value)}
            onKeyDown={(event) => 
              event.key === 'Enter' && 
              navigate(`/Movies?search=${encodeURIComponent(searchMovies)}`)}
          >
          </input>
          <button onClick={() => navigate(`/Movies?search=${encodeURIComponent(searchMovies)}`)}>Search</button>
        </div>

        <div className="movie-list">
          {movies.map((movie) => (
            <div className="movie" key={movie.imdbID}>
                <div className="movie-card">
                  <h3 className="card__title">{movie.Title}</h3>
                  <p>Release Date: {movie.Year}</p>
                  <img className="movie__image" src={movie.Poster} alt={movie.Title} />
                </div>
              </div>
            )
          )}
          </div>
          </>
        )}
        <Footer />
    </>
  )
}

export default Home;
