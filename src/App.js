import logo from './logo.svg';
import React,{ Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
// import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundpage/NotFoundPage';
import AppLayout from './layout/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const MoviePage = React.lazy(() => import('./pages/Movies/MoviePage'));
// 홈페이지 / 
// 영화 전체 서치 /movies?q=asdf
// 영화 디테일 페이지 /movies/:id


function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<AppLayout/>}>
            <Route index element={<Homepage/>}/>
            {/* <Route path="/movies" element={<MoviePage/>}/> */}
            {/* <Route path="/movies/:id" element={<MovieDetailPage/>}/> */}
            <Route path="movies">
              <Route index element={<MoviePage/>}/>
              <Route path=":id" element={<MovieDetailPage/>}/>
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Suspense>
      
    </div>
  );
}

export default App;
