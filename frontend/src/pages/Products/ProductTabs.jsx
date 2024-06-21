import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row mt-10">
      <section className="mr-10">
        <div
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Escribe tus calificaciones
        </div>
        <div
          className={`tab-button ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Todas las calificaciones
        </div>
        <div
          className={`tab-button ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Productos relacionados
        </div>
      </section>

      {/* Second Part */}
      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Calificacion
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Malo</option>
                    <option value="2">Bueno</option>
                    <option value="3">Bien</option>
                    <option value="4">Excelente</option>
                    <option value="5">Excepcional</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comentario
                  </label>

                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Enviar
                </button>
              </form>
            ) : (
              <p>
                Por favor <Link to="/login">Inicia Sesion</Link> para escribir una reseña
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="reviews-container mt-4">
            {product.reviews.length === 0 ? (
              <p>Sin reseñas</p>
            ) : (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="review-item bg-gray-800 p-4 rounded-lg mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-gray-300">{review.name}</strong>
                    <p className="text-gray-300">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 3 && (
          <div className="related-products-container mt-4">
            {!data ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((product) => (
                  <SmallProduct key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
