import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

function Login({ onCloseForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [error, setError] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra điều kiện
    if (!username || !password) {
      setError("Tên đăng nhập và mật khẩu không được để trống.");
      return;
    }

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }



    setError(""); // Xóa lỗi nếu hợp lệ
    alert("Đăng nhập thành công!");
    onCloseForm(); 
  };

  return (
    <>
      {/* màn hình lớn */}
      <div className="hidden lg:flex flex-col m-4 p-8 rounded-lg shadow-lg w-[400px]">
        <div className="text-center mb-6">
          
          <h2 className="text-2xl text-red-500 font-bold">Đăng nhập</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Ô nhập tên đăng nhập */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tên đăng nhập hoặc email"
              className={`p-3 border rounded w-full ${
                !username && error ? "border-red-500" : "focus:border-blue-500"
              } focus:outline-none`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Ô nhập mật khẩu */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className={`p-3 border rounded w-full ${
                (password.length < 8 || !password) && error
                  ? "border-red-500"
                  : "focus:border-blue-500"
              } focus:outline-none`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Thông báo lỗi */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Liên kết quên mật khẩu */}
          <div className="flex items-center justify-between">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>

      {/* Màn hình nhỏ */}
        <div className="lg:hidden bg-white m-4 p-6 rounded-lg shadow-md w-full min-w-[300px] mx-auto">
          <div className="text-center mb-4">
            <img
              src="/images/logo-tron.png"
              alt="Logo"
              className="w-16 h-16 mx-auto mb-2"
            />
            <h2 className="text-lg font-bold sm:text-xl">Đăng nhập</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Ô nhập tên đăng nhập */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tên đăng nhập hoặc email"
                className={`p-2 border rounded w-full text-sm ${
                  !username && error ? "border-red-500" : "focus:border-blue-500"
                } focus:outline-none`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Ô nhập mật khẩu */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className={`p-2 border rounded w-full text-sm ${
                  (password.length < 8 || !password) && error
                    ? "border-red-500"
                    : "focus:border-blue-500"
                } focus:outline-none`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-2 right-2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Thông báo lỗi */}
            {error && <p className="text-red-500 text-xs">{error}</p>}

            {/* Liên kết quên mật khẩu */}
            <div className="flex items-center justify-between text-xs">
              <a href="#" className="text-blue-500 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              className="w-full p-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
            >
              Đăng nhập
            </button>
          </form>
        </div>

       
    </>
  );
}

Login.propTypes = {
  onCloseForm: PropTypes.func
};

export default Login;

