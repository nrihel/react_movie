import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Details = () => {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getMovieDetails() {
        try {
            setLoading(true);
            const movieData = await axios.get(
                `https://www.omdbapi.com/?apikey=db4e97d3&i=${imdbID}`
            );
            setMovie(movieData.data);
        } catch (error) {
            console.error("couldn't find movie", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    useEffect(() => {
        getMovieDetails();
    }, [imdbID])
  return (
    <>
    <Navbar />
        <div classname="details">
            <div className="details-img.">
                <img className="poster" src={movie.poster} alt="movie poster"></img>
            </div>
        </div>
    <Footer />  
    </>
  )
}

export default Details
