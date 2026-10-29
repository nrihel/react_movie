import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import "../moviestyle.css";
import { useNavigate, useSearchParams } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  const [searchMovies, setSearchMovies] = useState([]);

  function onSearch() {
    movieSearch(searchMovies)
  }

  console.log(process.env.REACT_APP_OMDB_API_KEY)
  async function movieSearch (title) {
    const { data } = await axios.get
    (`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${title}`)
    setSearchMovies(data);
  }

  function onSearchKeyPress(key) {
    if (key === 'Enter')
      onSearch()
  }

  return (
    <>
        <Navbar />
      
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
        <div className="home">
          <img className="home__img" src="/movie theater.svg" alt="theater"></img>
        </div>
        <Footer />
    </>
  )
}

export default Home;
