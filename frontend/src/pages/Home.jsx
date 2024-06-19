import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex flex-col items-center mt-10 px-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <h1 className="text-5xl font-bold mb-6">Productos Especiales</h1>
              <Link
                to="/shop"
                className="bg-pink-600 text-white font-semibold rounded-full py-3 px-10 shadow-lg hover:bg-pink-700 transition duration-300"
              >
                Tienda
              </Link>
            </div>
          </div>
          <div className="mt-10 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
