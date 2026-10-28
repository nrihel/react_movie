import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchSkeleton from '../components/SearchSkeleton';
import axios from 'axios';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Movies = () => {
    const {imdbID} = useParams();
    const [searchParams, setSearchParams] = useSearchParams()
    const title = searchParams.get('search') || '';
    const navigate = useNavigate();
    const location = useLocation();
    const [searchMovies, setSearchMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [loading, setLoading] = useState(Boolean(title));

    useEffect(() => {
        if (title) movieSearch(title);
    }, [title]);

    function onSearch() {
        setSearchParams({ search: searchTitle});
    }
    async function movieSearch (title) {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `https://www.omdbapi.com/?apikey=db4e97d3&s=${title}`
            );
        setSearchMovies(data.Search || []);
        } catch (error) {
            console.error("couldn't find movies", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    function sortMovies(movies, option) {
        const sorted = [...movies];

        if (option === "oldest") {
            sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));            
        } else if (option === "newest") {
            sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        } else if (option === "a-z") {
            sorted.sort((a, b) => a.Title.localeCompare(b.Title));
        } else if (option === "z-a") {
            sorted.sort((a, b) => b.Title.localeCompare(a.Title));
        }

        return sorted;
    } 



  return (
  <>
    <Navbar />

        {loading ? (
        <SearchSkeleton />
        ) : (
        <>
            <div className="movie__search">
            <button onClick={onSearch}>Search</button>

            <input
                type="text"
                id="Title"
                placeholder="Search by Title"
                onChange={(event) => setSearchTitle(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && onSearch()}
            />

            <div className="sort">
                <select
                id="filter"
                defaultValue=""
                onChange={(event) =>
                    setSearchMovies((movies) =>
                    sortMovies(movies, event.target.value)
                    )
                }
                >
                <option value="" disabled>Sort</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
                </select>
            </div>
            </div>

            <div className="movie-list">
            {searchMovies.length > 0 ? (
                searchMovies.map((movie) => (
                <div className="movie" key={movie.imdbID}>
                    <div
                    className="movie-card"
                    onClick={() =>
                        navigate(`/Details/${movie.imdbID}`, {
                        state: { search: title },
                        })
                    }
                    >
                    <h3 className="card__title">{movie.Title}</h3>
                    <p>Release Date: {movie.Year}</p>
                    <img
                        className="movie__image"
                        src={movie.Poster}
                        alt={movie.Title}
                    />
                    </div>
                </div>
                ))
            ) : (
                <h2 className="movie__reload">Search for any Movie!!</h2>
            )}
            </div>
          </>
        )}
        <Footer />
    </>
    );
};

export default Movies;