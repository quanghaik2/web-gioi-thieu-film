import { useContext, useEffect, useState } from "react";
import { FaStar, FaClock, FaCalendarAlt, FaFilm, FaPlay, FaHeart } from "react-icons/fa";
import "../../public/css/DetailMovie.css";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieDetailContext";

function DetailMovie() {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null); // Trạng thái lỗi
  const { id } = useParams(); // Lấy id từ URL
  const url = `https://api.themoviedb.org/3/movie/${id}?language=vi`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Sử dụng API key từ biến môi trường
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
        setMovieDetails(data); // Lưu dữ liệu vào state
      } catch (error) {
        setError(error.message); // Lưu thông báo lỗi vào state
      }
    };

    fetchMovieDetails();
  }, [id]); // useEffect chạy lại khi `id` thay đổi

  if (error) {
    return <div className="error bg-white">❌ {error}</div>; // Hiển thị lỗi
  }

  if (!movieDetails) {
    return <div className="loading">Loading...</div>; // Hiển thị khi dữ liệu chưa được tải xong
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
      {/* Background và overlay */}
      <div
        className="background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      >
        <div className="overlay"></div>
      </div>

      {/* Nội dung */}
      <div className="content">
        <div className="poster-section">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="poster"
          />
          {/* Nút Play Trailer và Add to Favorites */}
          <div className="button-group">
            <button
              className="btn play-trailer"
              onClick={() => handleVideoTrailer(id)}
            >
              <FaPlay className="icon" /> Play Trailer
            </button>
            <button
              className="btn add-to-favorites"
              onClick={() => console.log(`Added ${title} to favorites!`)}
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
