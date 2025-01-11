import { useEffect, useState } from "react";
import { FaStar, FaClock, FaCalendarAlt, FaFilm } from "react-icons/fa";
import "../../public/css/DetailMovie.css";

function DetailMovie() {
  const [movieDetails, setMovieDetails] = useState(null);
  const movieId = 402431; // ID của bộ phim cần lấy chi tiết
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=vi`;

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
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMovieDetails(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, []); // useEffect chỉ chạy một lần khi component được render

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
