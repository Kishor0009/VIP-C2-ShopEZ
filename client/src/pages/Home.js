import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
  (product) =>
    product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    product.category
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
);

  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mt-4">
      <div className="hero-section text-white text-center mb-5">
        <h1 style={{ fontWeight: "700", fontSize: "2.5rem" }}>
          Welcome to ShopEZ
        </h1>
        <p className="mt-3" style={{ fontSize: "1.1rem", opacity: 0.9 }}>
          Shop Smarter, Faster and Easier
        </p>
        <button className="btn btn-warning btn-lg mt-3 px-4" onClick={scrollToProducts}>
          Shop Now
        </button>
      </div>

      <div id="products-section">
        <h2 className="section-title">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <div className="empty-state">
            <p className="mt-3">No products available right now.</p>
          </div>
        ) : (
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;