import { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { MdOutlineLogout } from "react-icons/md";
import axios from 'axios';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyễn Văn A',
    age: 25,
    email: 'nguyenvana@example.com',
    favoriteMovies: [],
  });
  const [newMovie, setNewMovie] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = '677b7257afff6ec1f07f503e'; // ID người dùng
  const apiUrl = `http://localhost:3000/api/favorite-movies/${userId}`;

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await axios.get(apiUrl);
        const { user, movies } = response.data;

        setUserInfo((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
          favoriteMovies: movies.map((movie) => ({
            title: movie.title,
            genre: movie.genre,
            releaseDate: movie.releaseDate,
            poster: movie.poster,
            id: movie._id,
          })),
        }));
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [apiUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAddMovie = () => {
    if (newMovie.trim()) {
      setUserInfo({
        ...userInfo,
        favoriteMovies: [
          ...userInfo.favoriteMovies,
          { title: newMovie.trim(), id: Date.now().toString() }, // Tạo ID giả cho phim mới
        ],
      });
      setNewMovie('');
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/favorite-movies/${userId}/${movieId}`
      );
      if (response.status === 200) {
        // Cập nhật danh sách phim sau khi xóa thành công
        const updatedMovies = userInfo.favoriteMovies.filter((movie) => movie.id !== movieId);
        setUserInfo({ ...userInfo, favoriteMovies: updatedMovies });
        alert('Xóa phim thành công!');
      } else {
        console.error('Xóa phim không thành công:', response.statusText);
        alert('Có lỗi xảy ra khi xóa phim.');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API xóa phim:', error);
      alert('Không thể xóa phim. Vui lòng thử lại sau.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/update/${userId}`, // URL của API server
        {
          email: userInfo.email,
          age: userInfo.age,
          name: userInfo.name,
        }
      );
  
      if (response.status === 200) {
        alert('Thông tin đã được lưu!');
        console.log('Thông tin cá nhân đã được lưu:', userInfo);
      }
    } catch (error) {
      console.error('Lỗi khi lưu thông tin:', error);
      alert('Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại sau.');
    }
  };
  

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="w-full text-black h-dvh mt-32 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Thông tin cá nhân</h1>

        {/* Avatar và thông tin cơ bản */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-green-300 rounded-full flex font-medium items-center justify-center text-white  text-[35px]">
            {userInfo.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-lg">{userInfo.name}</p>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>

        {/* Các trường thông tin */}
        <div className="grid w-2/4 mx-auto grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Độ tuổi:</label>
            <input
              type="number"
              name="age"
              value={userInfo.age}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>

        {/* Danh sách phim yêu thích */}
        <div className="mb-6 w-1/2 mx-auto">
          <h2 className="text-lg font-semibold mb-2">Danh sách phim yêu thích</h2>
          <div className="bg-gray-50 p-4 rounded-md border">
            {userInfo.favoriteMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center justify-between p-2 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-bold">{movie.title}</p>
                    <p className="text-sm text-gray-500">{movie.genre}</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteMovie(movie.id)} // Gọi API xóa
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            {/* <div className="flex items-center mt-4">
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
            </div> */}
          </div>
        </div>

        {/* Nút lưu */}
        <div className="text-center">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>

        <div className='flex items-center text-xl ml-[25%] mt-4 text-red-500 cursor-pointer' 
          onClick={handleLogout}>
            <MdOutlineLogout />
            Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
