import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [showPassword1, setShowPassword1] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !phone) {
      setError("Tất cả các trường không được để trống.");
      return;
    }

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.");
      return;
    }

    setError(""); // Xóa lỗi nếu hợp lệ
    alert("Đăng ký thành công!");
  };

  return (
    <>
      {/* Giao diện cho màn hình lớn */}
      <div className="hidden lg:block bg-white m-4 p-8 rounded-lg shadow-lg w-[400px]">
        <div className="text-center mb-6">
          <h2 className="text-2xl text-blue-500 font-bold">Đăng ký</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Ô nhập tên đăng nhập */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tên đăng nhập"
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

          {/* Ô nhập xác nhận mật khẩu */}
          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              className={`p-3 border rounded w-full ${
                (password !== confirmPassword || !confirmPassword) && error
                  ? "border-red-500"
                  : "focus:border-blue-500"
              } focus:outline-none`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute top-3 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Ô nhập số điện thoại */}
          <div className="relative">
            <input
              type="text"
              placeholder="Số điện thoại"
              className={`p-3 border rounded w-full ${
                (!phone || !/^[0-9]{10}$/.test(phone)) && error
                  ? "border-red-500"
                  : "focus:border-blue-500"
              } focus:outline-none`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Thông báo lỗi */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Đăng ký
          </button>
        </form>
      </div>

      {/* Giao diện thu gọn cho màn hình điện thoại */}
      <div className="lg:hidden bg-white m-4 p-6 rounded-xl shadow-md w-full min-w-[300px] mx-auto border border-gray-200">
        <div className="text-center mb-4">
          <img
            src="/images/logo-tron.png"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-3"
          />
          <h2 className="text-lg font-extrabold text-gray-700">Đăng ký</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Ô nhập tên đăng nhập */}
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="p-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Ô nhập mật khẩu */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="p-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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

          {/* Ô nhập xác nhận mật khẩu */}
          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              className="p-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute top-2 right-2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Ô nhập số điện thoại */}
          <input
            type="text"
            placeholder="Số điện thoại"
            className="p-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Thông báo lỗi */}
          {error && (
            <p className="text-red-500 text-xs bg-red-100 p-2 rounded-md text-center">
              {error}
            </p>
          )}

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
