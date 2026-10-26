import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);

  async function getMovies () {
    const { data } = await axios.get
    (`https://www.omdbapi.com/?apikey=db4e97d3&`)
    setMovies(data);
  }

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
        <Navbar />
        <div>
          {movies.map((movie) => (
            <div class="movie-card" onclick="showMovie('${movie.Title}')">
              <div class="movie-card__container">
              <h3>${movie.Title}</h3>
              <p>Release Date: ${movie.Year}</p>
              <img src="${movie.Poster}" alt="${movie.Title}" />
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
