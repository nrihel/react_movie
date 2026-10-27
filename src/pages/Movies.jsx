import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

const Movies = () => {
    const [searchMovies, setSearchMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');

    function onSearch() {
        movieSearch(searchTitle);
    }
    async function movieSearch (title) {
        const { data } = await axios.get
        (`https://www.omdbapi.com/?apikey=db4e97d3&s=${title}`)
        console.log(data)
        setSearchMovies(data.Search || []);
    }



  return (
    <>
    <Navbar />
        <div className="movie__search">
        <input 
            type="text" 
            id="Title" 
            placeholder="Search by Title" 
            onChange={(event) => setSearchTitle(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' && onSearch()}
        >
        </input>
        <button onClick={onSearch}>Search</button>
        </div>
        <div className="movie-list">
            {searchMovies.map((movie) => (
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

export default Movies
