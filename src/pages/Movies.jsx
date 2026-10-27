import React, { useEffect, useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Movies = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const title = location.state?.searchTitle || '';
    const [searchMovies, setSearchMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (title) movieSearch(title);
    }, [title]);

    function onSearch() {
        movieSearch(searchTitle);
    }
    async function movieSearch (title) {
        const { data } = await axios.get
        (`https://www.omdbapi.com/?apikey=db4e97d3&s=${title}`)
        console.log(data)
        setSearchMovies(data.Search || []);
    }

    function sortMovies(movies, option) {
        const sorted = [...movies];

        if (option === "oldest") {
            sorted.sort((a, b) => parseInt(a.year) - parseInt(b.year));            
        } else if (option === "newest") {
            sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        } else if (option === "a-z") {
            sorted.sort((a, b) => a.Title.localCompare(b.Title));
        } else if (option === "z-a") {
            sorted.sort((a, b) => b.Title.localCompare(a.Title));
        }
    } 



  return (
    <>
    <Navbar />
        <div className="movie__search">
            <button onClick={onSearch}>Search</button>
            <input 
                type="text" 
                id="Title" 
                placeholder="Search by Title" 
                onChange={(event) => setSearchTitle(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' && onSearch()}
            >
            </input>        
            <div className="sort">
                <select id="filter" onChange="filterMovie(event)">
                <option value="" disabled selected>Sort</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>        
                </select>
            </div>
        </div>
        <div className="movie-list">
            {searchMovies.map((movie) => (
            <div className="movie">
                <div className="movie-card" onClick={() => navigate('/Details')}>
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
