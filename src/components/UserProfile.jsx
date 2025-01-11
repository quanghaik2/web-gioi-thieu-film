import { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyễn Văn A',
    age: 25,
    email: 'nguyenvana@example.com',
    favoriteMovies: ['Phim Hành Động', 'Phim Khoa Học Viễn Tưởng'],
  });

  const [newMovie, setNewMovie] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAddMovie = () => {
    if (newMovie.trim()) {
      setUserInfo({
        ...userInfo,
        favoriteMovies: [...userInfo.favoriteMovies, newMovie.trim()],
      });
      setNewMovie('');
    }
  };

  const handleDeleteMovie = (index) => {
    const updatedMovies = userInfo.favoriteMovies.filter((_, i) => i !== index);
    setUserInfo({ ...userInfo, favoriteMovies: updatedMovies });
  };

  const handleSave = () => {
    alert('Thông tin đã được lưu!');
    console.log('Thông tin cá nhân:', userInfo);
  };

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

        {/* Danh sách yêu thích */}
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

        {/* Nút lưu */}
        <div className="text-center">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
