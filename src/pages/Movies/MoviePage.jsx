import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { Dropdown } from "react-bootstrap";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import "../Movies/MoviePage.style.css"

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 page 바꾸기
// page 값이 바뀔 때마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { data: genres } = useMovieGenreQuery();
  const keyword = query.get("q");

  useEffect(() => {
    setPage(1);
  }, [keyword]);
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    genre: selectedGenre,
  });
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  console.log("Ddd key", data);

  const sortedResults = [...(data?.results || [])];
  // const filteredMovies = sortedResults.filter((movie) =>
  //   selectedGenre ? movie.genre_ids.includes(selectedGenre) : true
  // );
  if (sortOption === "popularity") {
    sortedResults.sort((a, b) => b.popularity - a.popularity); // 인기 높은 순
  } else if (sortOption === "leastPopularity") {
    sortedResults.sort((a, b) => a.popularity - b.popularity); // 인기 낮은 순
  }

  const filteredMovies = sortedResults.filter((movie) =>
    selectedGenre ? movie.genre_ids.includes(selectedGenre) : true
  );
  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh", // 화면 전체 높이
          display: "flex",
          justifyContent: "center", // 가로 중앙
          alignItems: "center", // 세로 중앙
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className="dropdowns">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              정렬:
              {sortOption === "popularity"
                ? "인기순"
                : sortOption === "leastPopularity"
                ? "인기 낮은 순"
                : "기본순"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortOption("default")}>
                기본순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOption("popularity")}>
                인기순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOption("leastPopularity")}>
                인기 낮은 순
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-genre">
              장르:{" "}
              {selectedGenre
                ? genres.find((g) => g.id === selectedGenre)?.name
                : "전체"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedGenre(null)}>
                전체
              </Dropdown.Item>
              {genres.map((genre) => (
                <Dropdown.Item
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col lg={8} xs={12} className="cards-section">
          {filteredMovies.length === 0 ? (
            <div>결과가 없습니다.</div>
          ) : (
            <Row className="cards">
              {filteredMovies.map((movie, index) => (
                <Col key={index} lg={4} xs={6} style={{"padding":0}}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          )}
          {sortedResults.length === 0 ? (
            <div>결과가 없습니다.</div>
          ) : (
            <Row>
              {sortedResults.map((movie, index) => (
                <Col key={index} lg={4} xs={6} style={{"padding":0}}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          )}
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages} //전체 페이지
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
