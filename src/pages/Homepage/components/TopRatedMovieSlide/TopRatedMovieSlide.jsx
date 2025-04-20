import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovie.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Alert from 'react-bootstrap/Alert';
import Moviecard from "../MovieCard/Moviecard";
import "./TopRatedMovieSlide.style.css"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <h3 style={{paddingLeft:"16px"}}>TopRated Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
{
  data.results.map((movie, index) => (
    <Moviecard movie={movie} key={index} />
  ))
}
      </Carousel>
      
    </div>
  );
};

export default TopRatedMovieSlide;
