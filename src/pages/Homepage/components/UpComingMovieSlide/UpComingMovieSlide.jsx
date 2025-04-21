import React from "react";
import { useUpComingMoviesQuery } from "../../../../hooks/useUpComingMovie";
import Alert from "react-bootstrap/Alert";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";


const UpComingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpComingMoviesQuery();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <MovieSlider
      title="Upcoming Movies"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default UpComingMovieSlide;
