import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";


function Login({ onCloseForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Tên đăng nhập và mật khẩu không được để trống.");
      return;
    }

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // API của bạn yêu cầu `email` và `password`
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Đăng nhập thất bại");
        return;
      }

      const data = await response.json();
      alert("Đăng nhập thành công!");
      console.log("Token:", data); // Lưu token này nếu cần (vd: lưu trong localStorage)
      localStorage.setItem("userId", data.userId); // Lưu token vào localStorage
      onCloseForm();
    } catch (err) {
      console.error("Lỗi khi kết nối với API:", err);
      setError("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };

  return (
    <>
      {/* màn hình lớn */}
      <div className="hidden lg:flex text-black flex-col m-4 p-8 rounded-lg shadow-lg w-[400px]">
        <div className="text-center mb-6">
          <h2 className="text-2xl text-red-500 font-bold">Đăng nhập</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </>
  );
}

Login.propTypes = {
  onCloseForm: PropTypes.func,
};

export default Login;
