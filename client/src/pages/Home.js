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
      <div className="hero-section text-white mb-5" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "16px", padding: "60px 30px" }}>
        <div className="row align-items-center">
          <div className="col-md-7 text-md-start text-center mb-4 mb-md-0">
            <h1 style={{ fontWeight: "800", fontSize: "2.8rem", color: "#ff9f1c" }}>
              ShopEZ Hardware Hub
            </h1>
            <h2 className="h4 text-light mb-3" style={{ fontWeight: "500" }}>
              Built for Durability, Engineered for Performance
            </h2>
            <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
              Equip your workshop with top-quality power tools, reliable hand tools, safety gear, and DIY project essentials. Find everything you need to build, fix, and create.
            </p>
            <div className="mt-4 d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              <button className="btn btn-outline-light btn-lg px-4" onClick={scrollToProducts}>
                Browse Products
              </button>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img 
              src="/hero_tools.png" 
              alt="Tools and Hardware" 
              className="img-fluid" 
              style={{ maxHeight: "280px", borderRadius: "8px" }} 
            />
          </div>
        </div>
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