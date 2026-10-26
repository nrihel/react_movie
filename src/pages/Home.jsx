import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import "../moviestyle.css"

const Home = () => {
  const [movies, setMovies] = useState([]);

  async function getMovies () {
    const { data } = await axios.get
    (`https://www.omdbapi.com/?apikey=db4e97d3&s=star`)

    const randomMovies = (data.Search || [])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setMovies(randomMovies);
  }

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
        <Navbar />
        <div className="movie-list">
          {movies.map((movie) => (
            <div className="movie">
                <div className="movie-card">
                  <h3 className="card__title">{movie.Title}</h3>
                  <p>Release Date: {movie.Year}</p>
                  <img className="movie__image" src={movie.Poster} alt={movie.Title} />
                  </div>
              </div>
          )
        )}
        </div>
        <Footer />
    </>
  )
}

export default Home;
