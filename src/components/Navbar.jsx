import React from 'react'

const Navbar = () => {
  return (
    <div class="nav">
        <figure>
            <img class="logo" src="./assets/movie_logo.svg" />
        </figure>
        <ul class="nav__links">
            <a href="#" class="link 
            link__hover-effect
            link__hover-effect--white">Home</a>
            <a href="" class="link 
            link__hover-effect 
            link__hover-effect--white">Search</a>
        </ul>
    </div>
  )
}

export default Navbar
