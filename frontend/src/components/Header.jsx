import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-red-500">ERROR</h1>;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 min-h-screen text-white p-8 flex flex-col items-center">
      <div className="flex items-center justify-center mb-8">
        <img
          src="/uploads/logo-removebg-preview.png"
          alt="Tonny's Style Logo"
          className="w-16 h-16 mr-4"
        />
        <h1 className="text-5xl font-bold italic">Tonny's Style</h1>
      </div>
      <div className="w-full lg:w-1/4">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
