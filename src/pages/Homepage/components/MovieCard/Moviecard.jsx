import React from 'react'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import "../MovieCard/MovieCard.style.css"

const Moviecard = ({movie}) => {
  return (
    <div
      style={{backgroundImage:"url("+`https://image.tmdb.org/t/p/original/${movie.poster_path}`+")"}}
      className='movie-card'
    >
      <div className='overlay' style={{padding:"8px"}}>
        <h2>
          {movie.title}
        </h2>
        {movie.genre_ids.map((id)=>(<Badge bg="danger" style={{ marginRight:"8px", marginBottom:"8px"}}>{id}</Badge>))}
        <div style={{fontWeight:"lighter"}}>
          <div>vote_average {movie.vote_average}</div>
          <div>popularity {movie.popularity}</div>
          <div>{movie.adult?'over 18':'under 18'}</div>
        </div>
      </div>
    </div>
  )
}

export default Moviecard