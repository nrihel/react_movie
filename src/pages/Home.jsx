import React, { useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../moviestyle.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  const [searchMovies, setSearchMovies] = useState([]);

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
