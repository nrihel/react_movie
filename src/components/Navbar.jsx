import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/movie_logo.svg';

const Navbar = () => {
  return (
    <div className="nav">
        <figure>
            <img className="logo" src={logo} alt="movie_logo"/>
        </figure>
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
