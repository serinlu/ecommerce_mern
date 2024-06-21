import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import "./Product.css"; // Import the CSS file

const Product = ({ product }) => {
  return (
    <div className="product-container">
      <div className="image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <HeartIcon product={product} />
      </div>

      <div className="product-details">
        <Link to={`/product/${product._id}`}>
          <h2 className="product-title">
            <div className="text-lg">{product.name}</div>
            <span className="product-price">
              S/ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
