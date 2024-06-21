import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import "./Shop.css"; // Import the CSS file

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="shop-container">
      <div className="shop-sidebar">
        <div className="filter-section">
          <h2 className="filter-title">Filtro de Categorias</h2>
          <div className="filter-options">
            {categories?.map((c) => (
              <div key={c._id} className="filter-option">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="checkbox"
                />
                <label className="filter-label">{c.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h2 className="filter-title">Filtro de Marcas</h2>
          <div className="filter-options">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="filter-option">
                <input
                  type="radio"
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="radio"
                />
                <label className="filter-label">{brand}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h2 className="filter-title">Filtro por Precio</h2>
          <input
            type="text"
            placeholder="Enter Price"
            value={priceFilter}
            onChange={handlePriceChange}
            className="price-input"
          />
          <button className="reset-button" onClick={() => window.location.reload()}>
            Reiniciar
          </button>
        </div>
      </div>

      <div className="shop-products">
        <h2 className="products-count">{products?.length} Productos</h2>
        <div className="products-grid">
          {products.length === 0 ? (
            <Loader />
          ) : (
            products?.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
