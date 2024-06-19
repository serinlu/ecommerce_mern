import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative z-50 flex">
      <div className="flex flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh] fixed">
        <div className="flex flex-col justify-center space-y-4">
          <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Inicio</span>
          </Link>
          <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
            <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
          <Link to="/cart" className="flex relative">
            <div className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Cart</span>
            </div>
            <div className="absolute top-9">
              {cartItems.length > 0 && (
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </div>
          </Link>
          <Link to="/favorite" className="flex relative">
            <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
              <FaHeart className="mt-[3rem] mr-2" size={20} />
              <span className="hidden nav-item-name mt-[3rem]">Favoritos</span>
              <FavoritesCount />
            </div>
          </Link>
        </div>
        <div className="relative flex flex-col items-center">
          {userInfo && (
            <div className="flex flex-col items-center">
              {userInfo.isAdmin && <span className="text-red-500">ADMIN</span>}
              <span className="text-white flex items-center hover:text-red-500">
                {userInfo.nombre}
              </span>
            </div>
          )}
          {!userInfo && (
            <ul>
              <li>
                <Link to="/login" className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
                  <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                  <span className="hidden nav-item-name">Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center mt-5 transition-transform transform hover:translate-x-2">
                  <AiOutlineUserAdd size={26} />
                  <span className="hidden nav-item-name">Registro</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="absolute top-0 right-0 bg-[#000] text-white p-8 w-64 h-full z-50">
            <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
              X
            </button>
            <ul className="space-y-4 text-white">
              {userInfo?.isAdmin && (
                <>
                  <li>
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Tablero
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/productlist" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Crear un producto
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/allproductslist" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Listar Productos
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/categorylist" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Categorias
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/brandlist" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Marcas
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orderlist" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Ordenes
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/userlist" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Usuarios
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-700">
                  Perfil
                </Link>
              </li>
              <li className="absolute bottom-4 right-4 w-full">
                <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2"
        >
          <AiOutlineMenu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
