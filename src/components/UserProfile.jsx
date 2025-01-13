import { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyễn Văn A',
    age: 25,
    email: 'nguyenvana@example.com',
    favoriteMovies: [],
  });
  const [newMovie, setNewMovie] = useState('');
  const [loading, setLoading] = useState(true);

  // Lấy userId từ localStorage
  const userId = localStorage.getItem('userId');

  // Gọi API để lấy danh sách phim yêu thích
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await fetch(`http://localhost:3000/favorite-movies/${userId}`);
        if (!response.ok) {
          throw new Error('Không thể tải danh sách phim yêu thích.');
        }

        const data = await response.json();
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          favoriteMovies: data.movies.map((movie) => movie.title), // Chỉ lưu tên phim
        }));
      } catch (error) {
        console.error('Lỗi khi tải danh sách phim:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [userId]);

  // Xử lý thêm phim mới
  const handleAddMovie = async () => {
    if (!newMovie.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/api/favorite-movies/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title: newMovie.trim(),
          genre: 'Unknown', // Thêm thông tin thể loại nếu có
          releaseDate: 'Unknown', // Thêm ngày phát hành nếu có
          rating: 0, // Điểm đánh giá mặc định
          poster: '', // URL poster mặc định nếu có
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể thêm phim vào danh sách yêu thích.');
      }

      const data = await response.json();
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        favoriteMovies: data.favoriteMovies.movies.map((movie) => movie.title),
      }));
      setNewMovie('');
    } catch (error) {
      console.error('Lỗi khi thêm phim:', error);
    }
  };

  // Xử lý xóa phim yêu thích
  const handleDeleteMovie = async (index) => {
    const movieTitle = userInfo.favoriteMovies[index];
    try {
      const response = await fetch(`http://localhost:3000/api/favorite-movies/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, movieTitle }),
      });

      if (!response.ok) {
        throw new Error('Không thể xóa phim khỏi danh sách yêu thích.');
      }

      const data = await response.json();
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        favoriteMovies: data.favoriteMovies.movies.map((movie) => movie.title),
      }));
    } catch (error) {
      console.error('Lỗi khi xóa phim:', error);
    }
  };

  // Hiển thị trạng thái tải
  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="w-full text-black h-dvh mt-32 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Thông tin cá nhân</h1>

        {/* Avatar và thông tin cơ bản */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-bold text-lg">{userInfo.name}</p>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>

        {/* Danh sách phim yêu thích */}
        <div className="mb-6 w-1/2 mx-auto">
          <h2 className="text-lg font-semibold mb-2">Danh sách phim yêu thích</h2>
          <div className="bg-gray-50 p-4 rounded-md border">
            {userInfo.favoriteMovies.map((movie, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border-b last:border-b-0"
              >
                <span>{movie}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteMovie(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Thêm phim mới"
                value={newMovie}
                onChange={(e) => setNewMovie(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddMovie}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
