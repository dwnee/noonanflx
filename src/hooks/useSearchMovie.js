import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({keyword, page}) => {
  return keyword?api.get(`/search/movie?query=${keyword}&page=${page}`):api.get(`/movie/popular?page=${page}`)
}

export const useSearchMovieQuery = ({keyword, page}) => {
  return useQuery(
    {
      queryKey:['movie-search', {keyword, page}],
      queryFn:()=>fetchSearchMovie({keyword, page}),
      select:(result)=> {
        const data = result.data
        let limitedTotalPages = data.total_pages

        if (!keyword) {
          // popular 요청이면
          limitedTotalPages = Math.min(limitedTotalPages, 100) // popular는 100 정도로 제한
        } else {
          // 검색이면 1000까지 허용
          limitedTotalPages = Math.min(limitedTotalPages, 1000)
        }

        return {
          ...data,
          total_pages: limitedTotalPages,
        }
        }
      }
)}
