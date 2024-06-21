import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import "./ProductCard.css"; // Import the CSS file

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="product-card">
      <section className="image-section">
        <Link to={`/product/${p._id}`}>
          <span className="brand-tag">{p?.brand}</span>
          <img className="product-image" src={p.image} alt={p.name} />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="product-info">
        <div className="product-header">
          <h5 className="product-title">{p?.name}</h5>
          <p className="product-price">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "PEN",
            })}
          </p>
        </div>

        <p className="product-description">
          {p?.description?.substring(0, 60)} ...
        </p>

        <section className="product-actions">
          <Link to={`/product/${p._id}`} className="read-more">
            Lee más
            <svg
              className="read-more-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button className="add-to-cart" onClick={() => addToCartHandler(p, 1)}>
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
