import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet.css';

const Navbar = () => {
  return (
    <div className="nav">
        <figure>
            <img className="logo" src="/movie_logo.svg" alt="movie_logo"/>
        </figure>
        <h1 className="title">Movie Nerds</h1>
        <ul className="nav__links">
            <Link to="/" className="link 
            link__hover-effect
            link__hover-effect--white">Home</Link>
            <Link to="" className="link 
            link__hover-effect 
            link__hover-effect--white">Search</Link>
        </ul>
    </div>
  )
}

export default Navbar
