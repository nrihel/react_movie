import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieSkeleton from '../components/MovieSkeleton'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Details = () => {
    const location = useLocation();
    const search = location.state?.search || '';
    let navigate = useNavigate();
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getMovieDetails() {
        try {
            setLoading(true);
            const movieData = await axios.get(
                `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${imdbID}`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imdbID])
  return (
    <>
    <Navbar />
        <div className="details">
        {loading ? (
            <MovieSkeleton />
        ) : movie?.Response === 'True' ? (
            <div className="details-card">
                <div className="details-body">
                    <div className="details__top">
                        <div className="details__header">
                            <button className="details__button" onClick={() => 
                                navigate(`/Movies?search=${encodeURIComponent(search)}`)}>← Back</button>
                            <h1 className="details-card__title">{movie.Title}</h1>
                        </div>
                    </div>
                    <div className="details__info--container">
                        <section className="details__img--wrapper">
                            <img className="details__img" src={movie.Poster} alt={movie.Title} />
                        </section> 
                        <section className="details__info">
                            <p className="movie__detail">Genre: {movie.Genre}</p>
                            <p className="movie__detail">Description: {movie.Plot}</p>
                            <p className="movie__detail">Actors: {movie.Actors}</p>
                            <p className="movie__detail">Director: {movie.Director}</p>
                            <p className="movie__detail">Rating: {movie.Rated}</p>
                            <p className="movie__detail">Released: {movie.Year}</p>
                            <p className="movie__detail">Runtime: {movie.Runtime}</p>
                            <p className="movie__detail">Score: {movie.imdbRating}/10</p>
                        </section>
                    </div>
                </div>
            </div>
        ) : (
            <p>Movie details could not be loaded.</p>
        )}
    </div> 
    <Footer />  
    </>
  )
}

export default Details;
