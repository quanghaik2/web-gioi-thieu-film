import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Login from "./login";
import Register from "./register";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [currentForm, setCurrentForm] = useState("");
  const isLogin = localStorage.getItem("userId");
  const navigate = useNavigate();
  const handleUser = () => {
    if (isLogin) {
      navigate("/profile");
    } else {
      setCurrentForm("login");
    }
  }

  return (
    <div className="p-4 flex justify-between  fixed top-0 left-0 w-full z-[9999]  bg-black">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold"><a href="/">LiST MOVIE</a></h1>
        {/* <nav className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:text-red-700">
            Home
          </a>
          <a href="#" className="hover:text-red-700">
            About
          </a>
          <a href="#" className="hover:text-red-700">
            Contact
          </a>
          <a href="/detail" className="hover:text-red-700">
            Detail
          </a>
        </nav> */}
      </div>
      <div className="flex items-center space-x-5">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 py-1 text-[18px] px-3 rounded-2xl text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-red-700 text-white p-[12px] rounded-lg"
          onClick={() => onSearch(search)}
        >
          <FaSearch />
        </button>
        <button
          className="bg-teal-500 text-white p-3 text-xl rounded-full"
          onClick={handleUser} 
        >
          <FaRegUser />
        </button>
      </div>

       {/* Hiển thị form Đăng nhập hoặc Đăng ký */}
              {currentForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 xs:p-6 rounded-lg shadow-lg relative">
                    <button
                      className="absolute top-2 right-2 hover:text-gray-400 text-red-500 text-3xl xs:text-xl"
                      onClick={() => setCurrentForm("")} // Đóng form
                    >
                      <FaRegWindowClose />
                    </button>
                    {currentForm === "login" ? (
                      <div>
                        <Login onCloseForm={() => setCurrentForm("")}/>
                        <p className="text-sm text-black text-center mt-4">
                          Chưa có tài khoản?{" "}
                          <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => setCurrentForm("register")} // Chuyển sang Đăng ký
                          >
                            Đăng ký ngay
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Register />
                        <p className="text-sm text-black text-center mt-4">
                          Đã có tài khoản?{" "}
                          <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => setCurrentForm("login")} // Chuyển sang Đăng nhập
                          >
                            Đăng nhập ngay
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
      
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;