import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchSkeleton from '../components/SearchSkeleton';
import axios from 'axios';
import "../moviestyle.css";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Home = () => {
  const {imdbID} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('search') || '';
  let navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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
