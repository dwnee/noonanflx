
import React, {useEffect, useState, Suspense} from 'react'
import Banner from './components/Banner/Banner'
import Spinner from 'react-bootstrap/Spinner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide'
import UpComingMovieSlide from './components/UpComingMovieSlide/UpComingMovieSlide'
import "../Homepage/HomePage.style.css"


// 1. 배너 : popular 영화를 들고와서 첫번째 아이템을 보여주자
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const Homepage = () => {
  return (
    <div>
      <Suspense fallback={<Spinner/>}>
        <Banner/>
        <PopularMovieSlide/>
        <TopRatedMovieSlide/>
        <UpComingMovieSlide/>
      </Suspense>
    </div>
  )
}
export default Homepage