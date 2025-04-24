import React, {useEffect, useState} from 'react'
import axios from "axios"
import MovieCard from '../../common/MovieCard/MovieCard'
import { Container, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import api from "../../utils/api"
import "../MovieDetail/MovieDetailPage.style.css"

const MovieDetailPage = () => {
  const {id} = useParams();
  console.log("ID", id)
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movie/${id}?language=en-US`);
        setMovie(response.data);
      } catch (error) {
        console.error("영화 디테일 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  console.log(movie, "MMMMMOoovvviieeeee")
  return (
    <Container className="container-flex">
      <div>
        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />
      </div>
      <div>
      {movie.genres.map((genre) => (
  <div key={genre.id}>{genre.name}</div>
))}
        <h3>{movie.title}</h3>
        <div>🔥{movie.popularity.toFixed(1)}</div>
        <div>{movie.overview}</div>
        <div>💰{movie.budget.toLocaleString()}</div>
        <div>📅{movie.release_date}</div>
      </div>
    </Container>
  )
}

export default MovieDetailPage