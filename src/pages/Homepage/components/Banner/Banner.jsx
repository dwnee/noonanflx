import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovie';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css"

const Banner = () => {
  const {data, isLoading,isError, error } = usePopularMoviesQuery();
  console.log("Ddddd", data)
  // if(isLoading){
  //   return(
  //     <h1>
  //         <Spinner animation="border" role="status">
  //     <span className="visually-hidden">Loading...</span>
  //   </Spinner>
  //   </h1>
  //   )
  // }
  if(isError){
    return(
      <Alert variant="danger">{error.message}</Alert>
    )
  }
  return (
    <div className='banner'>
      <div 
        style={{
        backgroundImage: "url("+ `https://image.tmdb.org/t/p/original/${data.results[0].poster_path}` +")",
        }}
        className='banner-bg-img'
      >
      </div>
      <div className="banner-text-area">
        <h1>{data && data.results[0].title}</h1>
        <p>{data && data.results[0].overview}</p>
      </div>
    </div>
  )
}

export default Banner