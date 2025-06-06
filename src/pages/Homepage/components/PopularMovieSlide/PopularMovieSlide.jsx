import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovie";
import Alert from 'react-bootstrap/Alert';
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive} />
    </div>
  );
};

export default PopularMovieSlide;
