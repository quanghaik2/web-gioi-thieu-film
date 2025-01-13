import { useContext, useEffect, useState } from "react";
import { FaStar, FaClock, FaCalendarAlt, FaFilm, FaPlay, FaHeart } from "react-icons/fa";
import "../../public/css/DetailMovie.css";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieDetailContext";

function DetailMovie() {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${id}?language=vi`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Không tìm thấy phim với ID này.");
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToFavorites = async () => {
    const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
    if (!userId) {
      alert("Bạn cần đăng nhập để thêm phim vào danh sách yêu thích.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/favorite-movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title: movieDetails.title,
          genre: movieDetails.genres.map((genre) => genre.name).join(", "),
          releaseDate: movieDetails.release_date,
          rating: movieDetails.vote_average,
          poster: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Không thể thêm phim vào danh sách yêu thích.");
      }

      const data = await response.json();
      alert("Đã thêm phim vào danh sách yêu thích!");
      console.log("Danh sách yêu thích:", data.favoriteMovies);
    } catch (err) {
      console.error("Lỗi:", err.message);
      alert("Đã xảy ra lỗi khi thêm phim vào danh sách yêu thích.");
    }
  };

  if (error) {
    return <div className="error bg-white">❌ {error}</div>;
  }

  if (!movieDetails) {
    return <div className="loading">Loading...</div>;
  }

  const {
    title,
    tagline,
    release_date,
    runtime,
    genres,
    overview,
    poster_path,
    vote_average,
    vote_count,
  } = movieDetails;

  return (
    <div className="detail-page mt-12">
      <div
        className="background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      >
        <div className="overlay"></div>
      </div>

      <div className="content">
        <div className="poster-section">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="poster"
          />
          <div className="button-group">
            <button
              className="btn play-trailer"
              onClick={() => handleVideoTrailer(id)}
            >
              <FaPlay className="icon" /> Play Trailer
            </button>
            <button
              className="btn add-to-favorites"
              onClick={handleAddToFavorites} // Gọi API thêm phim vào danh sách yêu thích
            >
              <FaHeart className="icon" /> Add to Favorites
            </button>
          </div>
        </div>
        <div className="info-section">
          <h1 className="title">
            {title} ({new Date(release_date).getFullYear()})
          </h1>
          <p className="tagline">{tagline}</p>
          <p className="info">
            <FaFilm className="icon" />
            <strong>Thể loại:</strong> {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="info">
            <FaClock className="icon" />
            <strong>Thời lượng:</strong> {Math.floor(runtime / 60)}h {runtime % 60}m
          </p>
          <p className="info">
            <FaCalendarAlt className="icon" />
            <strong>Ngày phát hành:</strong> {release_date}
          </p>
          <p className="info">
            <FaStar className="icon" />
            <strong>Điểm đánh giá:</strong> {vote_average} ({vote_count} lượt đánh giá)
          </p>
          <h3 className="overview-title">Tóm tắt:</h3>
          <p className="overview">{overview}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailMovie;
