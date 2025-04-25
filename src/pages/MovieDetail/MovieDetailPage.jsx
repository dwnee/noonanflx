import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../common/MovieCard/MovieCard";
import { Container, Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import "../MovieDetail/MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  console.log("ID", id);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [trailer, setTrailer] = useState(null); // To store the trailer's video key
  const [showModal, setShowModal] = useState(false);

  const handleShowTrailer = () => setShowModal(true); // To show the modal
  const handleCloseTrailer = () => setShowModal(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, reviewsRes, recommendationsRes, videosRes] =
          await Promise.all([
            api.get(`/movie/${id}?language=en-US`),
            api.get(`/movie/${id}/reviews?language=en-US`),
            api.get(`/movie/${id}/recommendations?language=en-US&page=1`),
            api.get(`/movie/${id}/videos?language=en-US`),
          ]);
        setMovie(movieRes.data);
        setReviews(reviewsRes.data.results); // 리뷰는 results 배열 안에 있음
        setRecommendedMovies(recommendationsRes.data.results); // 추천 영화
        const trailerVideo = videosRes.data.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailerVideo) {
          setTrailer(trailerVideo.key); // Store the trailer video key
        }
      } catch (error) {
        console.error("영화 디테일 또는 리뷰 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading)
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
  console.log(movie, "MMMMMOoovvviieeeee");
  return (
    <Container className="container-flex px-0">
      <div className="movie-info">
        <div>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
          />
        </div>
        <div>
          <div className="movie-desc">
            {movie.genres.map((genre) => (
              <div key={genre.id}>{genre.name}</div>
            ))}
            <h1>{movie.title}</h1>
            <div>🔥{movie.popularity.toFixed(1)}</div>
            <div>{movie.overview}</div>
            <div>💰{movie.budget.toLocaleString()}</div>
            <div>📅{movie.release_date}</div>
            <Button className="btn-trailer" onClick={handleShowTrailer}>
              예고편 보기
            </Button>
            <Modal
              show={showModal}
              onHide={handleCloseTrailer}
              centered
              size="lg"
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>예고편</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {trailer ? (
                  <YouTube
                    className="mb-yt"
                    videoId={trailer}
                    opts={{
                      height: "100%", // 자동 크기 조정
                      width: "100%", // 너비를 100%로 설정
                      playerVars: { autoplay: 1 },
                    }}
                  />
                ) : (
                  <p>예고편을 불러오는 중입니다...</p>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      {reviews.length > 0 && (
        <Container className="mt-5">
          <h3>Reviews</h3>
          {reviews.map((review) => {
            const isExpanded = expandedReviews[review.id];
            const toggleExpand = () => {
              setExpandedReviews((prev) => ({
                ...prev,
                [review.id]: !prev[review.id],
              }));
            };

            const contentToShow = isExpanded
              ? review.content
              : review.content.length > 300
              ? review.content.slice(0, 300) + "..."
              : review.content;

            return (
              <div key={review.id} className="mb-4">
                <strong>{review.author}</strong>
                <p>{contentToShow}</p>
                {review.content.length > 300 && (
                  <button
                    onClick={toggleExpand}
                    className="btn btn-link p-0"
                    style={{ color: "red" }}
                  >
                    {isExpanded ? "fold" : "view more"}
                  </button>
                )}
                <hr />
              </div>
            );
          })}
        </Container>
      )}

      {/* 추천 영화 섹션 */}
      {recommendedMovies.length > 0 && (
        <Container className="mt-5 px-0">
          <h3 style={{ paddingLeft: "12px" }}>Recommendations</h3>
          <Row className="gx-0">
            {recommendedMovies.map((movie) => (
              <Col
                key={movie.id}
                lg={3}
                xs={6} // 모바일에서 2개씩 보이도록 설정
                // className="p-1"
              >
                <div style={{ width: "100%" }}>
                  <MovieCard movie={movie} className="detail-rec-movie"/>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default MovieDetailPage;
