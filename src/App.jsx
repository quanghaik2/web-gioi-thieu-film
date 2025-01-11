import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import UserProfile from "./components/UserProfile";
import { useState, useEffect } from "react";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";
import DetailMovie from "./components/DetailMovie";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    if (value === "") return setSearchData([]);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const fetchMovies = async (url) => {
        return await fetch(url, options).then((response) => response.json());
      };

      try {
        const response = await Promise.all(urls.map(fetchMovies));
        setTrendingMovies(response[0].results);
        setTopRatedMovies(response[1].results);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Router>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  {searchData.length === 0 && (
                    <MovieList
                      title="Phim Hot"
                      data={trendingMovies.slice(0, 10)}
                    />
                  )}
                  {searchData.length === 0 && (
                    <MovieList
                      title="Phim đề cử"
                      data={topRatedMovies.slice(0, 10)}
                    />
                  )}
                  {searchData.length > 0 && <MovieSearch data={searchData} />}
                </>
              }
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/detail/:id" element={<DetailMovie />} />
          </Routes>
        </div>
      </MovieProvider>
    </Router>
  );
}

export default App;
