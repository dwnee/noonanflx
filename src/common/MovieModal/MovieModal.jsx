import React from 'react'
import { useMovieTrailerQuery } from '../../hooks/useMovieTrailer'

const MovieModal = ({movie, ...props}) => {
  const opts = {
    height : "100%",
    width : "100%",
    playerVars: {
      autoplay:1,
    },
  }
  const {data, isLoading, isError, error} = useMovieTrailerQuery(movie.id);
  // if(isLoading){
  //   return <Spinner/>
  // }
  if(isError) {
    return <ErrorMessage error={error}/>
  }
  const modalContent = () => {
    if(data.data.results.length === 0){
      return (
        <Alert key="danger" variant="danger"/>
      )
    }
  }
  return (
    <div>MovieModal</div>
  )
}

export default MovieModal