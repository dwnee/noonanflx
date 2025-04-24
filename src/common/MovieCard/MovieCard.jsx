import React from "react";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";


const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/movies/${movie.id}`); 
  };
  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
  return (
    /*  <div
      style={{backgroundImage:"url("+`https://image.tmdb.org/t/p/original/${movie.poster_path}`+")"}}
      className='movie-card'
    >
      <div className='overlay' style={{padding:"8px"}}>
        <h2>
          {movie.title}
        </h2>
        {showGenre(movie.genre_ids).map((id)=>(<Badge bg="danger" style={{ marginRight:"8px", marginBottom:"8px"}}>{id}</Badge>))}
        <div style={{fontWeight:"lighter"}}>
          <div>vote_average {movie.vote_average}</div>
          <div>popularity {movie.popularity}</div>
          <div>{movie.adult?'over 18':'under 18'}</div>
        </div>
      </div>
    </div> */
    <div className="movie-card" onClick={goToDetail}>
      <div
        className="movie-card-inner"
        style={{
          backgroundImage:
            "url(https://image.tmdb.org/t/p/original/" +
            movie.poster_path +
            ")",
        }}
      >
        <div className="overlay" style={{ padding: "8px" }}>
          <h2>{movie.title}</h2>
          {showGenre(movie.genre_ids).map((id) => (
            <Badge
              bg="danger"
              style={{ marginRight: "8px", marginBottom: "8px" }}
            >
              {id}
            </Badge>
          ))}
          <div style={{ fontWeight: "lighter" }}>
            <div>vote_average {movie.vote_average}</div>
            <div>popularity {movie.popularity}</div>
            <div>{movie.adult ? "over 18" : "under 18"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
