import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({keyword, page, genre, sortOption}) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  }

  // popular & 장르 필터링 및 정렬
  let url = `/discover/movie?page=${page}`;
  if (genre) {
    url += `&with_genres=${genre}`;
  }
  if (sortOption === 'popularity') {
    url += `&sort_by=popularity.desc`;
  } else if (sortOption === 'leastPopularity') {
    url += `&sort_by=popularity.asc`;
  }

  return api.get(url);
  
  // if (genre) {
  //   let url = `/discover/movie?page=${page}&with_genres=${genre}`
  //   if (keyword) {
  //     url += `&query=${keyword}`
  //   }
  //   return api.get(url)
  // } else {
  //   return keyword?api.get(`/search/movie?query=${keyword}&page=${page}`):api.get(`/movie/popular?page=${page}`)
  // }
}

export const useSearchMovieQuery = ({keyword, page, genre, sortOption}) => {
  return useQuery(
    {
      queryKey:['movie-search', {keyword, page,genre, sortOption}],
      queryFn:()=>fetchSearchMovie({keyword, page, genre, sortOption}),
      select:(result)=> {
        const data = result.data
        let limitedTotalPages = data.total_pages
        limitedTotalPages = keyword
          ? Math.min(limitedTotalPages, 1000)
          : Math.min(limitedTotalPages, 100);

        // if (!keyword) {
        //   // popular 요청이면
        //   limitedTotalPages = Math.min(limitedTotalPages, 100) // popular는 100 정도로 제한
        // } else {
        //   // 검색이면 1000까지 허용
        //   limitedTotalPages = Math.min(limitedTotalPages, 1000)
        // }

        return {
          ...data,
          total_pages: limitedTotalPages,
        }
        }
      }
)}
