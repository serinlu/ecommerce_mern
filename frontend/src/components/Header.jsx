import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import ProductCarousel from "../pages/Products/ProductCarousel";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-red-500">ERROR</h1>;
  }

  return (
    <div className="header-container">
      <div className="header-content">
        <img
          src="/uploads/logo-removebg-preview.png"
          alt="Tonny's Style Logo"
          className="logo"
        />
        <h1 className="title">Tonny's Style</h1>
      </div>
      <div className="carousel-container">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
