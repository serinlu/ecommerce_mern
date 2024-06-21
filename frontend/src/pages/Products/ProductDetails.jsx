import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState("write-review");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="go-back-container">
        <Link to="/" className="go-back-button">
          Retroceder
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="product-details-container">
            <div className="image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <HeartIcon product={product} />
            </div>

            <div className="details-container">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">S/ {product.price}</p>

              <div className="product-info">
                <div className="info-column">
                  <h1 className="info-item">
                    <FaStore className="info-icon" /> Marca: {product.brand}
                  </h1>
                  <h1 className="info-item">
                    <FaClock className="info-icon" /> Agregado: {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="info-item">
                    <FaStar className="info-icon" /> Calificaciones: {product.numReviews}
                  </h1>
                </div>

                <div className="info-column">
                  <h1 className="info-item">
                    <FaStar className="info-icon" /> Calificaciones: {product.rating}
                  </h1>
                  <h1 className="info-item">
                    <FaShoppingCart className="info-icon" /> Cantidad: {product.quantity}
                  </h1>
                  <h1 className="info-item">
                    <FaBox className="info-icon" /> En Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="actions-container">
                {product.countInStock > 0 && (
                  <div className="quantity-container">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="quantity-select"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <span className="quantity-unit">por metros</span>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="add-to-cart-button"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <div className="tabs-container">
            <div className="tab-buttons">
            
            </div>
            <ProductTabs
              activeTab={activeTab}
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
