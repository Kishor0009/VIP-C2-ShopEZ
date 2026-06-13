import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: "popular",
    category: "All",
    priceRange: "All",
    inStock: false,
    outOfStock: false,
  });

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

  const handleClearFilters = () => {
    setFilters({
      sortBy: "popular",
      category: "All",
      priceRange: "All",
      inStock: false,
      outOfStock: false,
    });
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // 1. Search term filter
  let processedProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Category filter
  if (filters.category !== "All") {
    processedProducts = processedProducts.filter(
      (product) => product.category === filters.category
    );
  }

  // 3. Price range filter
  if (filters.priceRange !== "All") {
    processedProducts = processedProducts.filter((product) => {
      const sellingPrice = product.discount > 0
        ? Math.round(product.price - (product.price * product.discount) / 100)
        : product.price;

      switch (filters.priceRange) {
        case "under-500":
          return sellingPrice < 500;
        case "500-2000":
          return sellingPrice >= 500 && sellingPrice <= 2000;
        case "2000-5000":
          return sellingPrice >= 2000 && sellingPrice <= 5000;
        case "above-5000":
          return sellingPrice > 5000;
        default:
          return true;
      }
    });
  }

  // 4. Availability filter
  if (filters.inStock && !filters.outOfStock) {
    processedProducts = processedProducts.filter((product) => product.stock > 0);
  } else if (!filters.inStock && filters.outOfStock) {
    processedProducts = processedProducts.filter((product) => product.stock === 0);
  }

  // 5. Sorting
  if (filters.sortBy === "price-asc") {
    processedProducts = [...processedProducts].sort((a, b) => {
      const priceA = a.discount > 0 ? Math.round(a.price - (a.price * a.discount) / 100) : a.price;
      const priceB = b.discount > 0 ? Math.round(b.price - (b.price * b.discount) / 100) : b.price;
      return priceA - priceB;
    });
  } else if (filters.sortBy === "price-desc") {
    processedProducts = [...processedProducts].sort((a, b) => {
      const priceA = a.discount > 0 ? Math.round(a.price - (a.price * a.discount) / 100) : a.price;
      const priceB = b.discount > 0 ? Math.round(b.price - (b.price * b.discount) / 100) : b.price;
      return priceB - priceA;
    });
  } else if (filters.sortBy === "discount") {
    processedProducts = [...processedProducts].sort((a, b) => (b.discount || 0) - (a.discount || 0));
  } else if (filters.sortBy === "popular") {
    processedProducts = [...processedProducts].sort((a, b) => {
      const idxA = products.findIndex((p) => p._id === a._id);
      const idxB = products.findIndex((p) => p._id === b._id);
      return idxA - idxB;
    });
  }

  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mt-4">
      <div className="hero-section text-white mb-5" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "16px", padding: "60px 30px" }}>
        <div className="row align-items-center">
          <div className="col-7">
            <h1
              style={{fontWeight: "800",fontSize: "2.8rem",color: "#ff9f1c",}}
              >
                ShopEZ{" "}
              <span
                style={{fontSize: "1.4rem",fontWeight: "600",color: "#94A3B8",}}
                >
                 Hardware Hub
               </span>
            </h1>
            <h2 className="h4 text-light mb-3" style={{ fontWeight: "500" }}>
              Built for Durability, Engineered for Performance
            </h2>
            <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
              Equip your workshop with top-quality power tools, reliable hand tools, safety gear, and DIY project essentials. Find everything you need to build, fix, and create.
            </p>
            <div className="mt-4 d-flex gap-2">
              <button className="btn btn-outline-light btn-lg px-4" onClick={scrollToProducts}>
                Browse Products
              </button>
            </div>
          </div>
          <div className="col-5 text-center">
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
          <div className="row g-4">
            {/* Left Column: Filter Sidebar */}
            <div className="col-3">
              <div 
                className="card p-3 mb-4" 
                style={{ 
                  backgroundColor: "#ffffff", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "12px", 
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)" 
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <h5 className="mb-0" style={{ fontWeight: "600", fontSize: "1.05rem" }}>Filters</h5>
                  <button 
                    className="btn btn-sm btn-link text-danger p-0 text-decoration-none" 
                    onClick={handleClearFilters}
                    style={{ fontSize: "0.85rem", fontWeight: "500" }}
                  >
                    Clear All
                  </button>
                </div>

                {/* Sort By */}
                <div className="mb-3">
                  <h6 className="mb-2" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Sort By</h6>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sortBy"
                      id="sortPopular"
                      value="popular"
                      checked={filters.sortBy === "popular"}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="sortPopular" style={{ fontSize: "0.85rem" }}>
                      Popular
                    </label>
                  </div>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sortBy"
                      id="sortPriceAsc"
                      value="price-asc"
                      checked={filters.sortBy === "price-asc"}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="sortPriceAsc" style={{ fontSize: "0.85rem" }}>
                      Price (Low to High)
                    </label>
                  </div>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sortBy"
                      id="sortPriceDesc"
                      value="price-desc"
                      checked={filters.sortBy === "price-desc"}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="sortPriceDesc" style={{ fontSize: "0.85rem" }}>
                      Price (High to Low)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sortBy"
                      id="sortDiscount"
                      value="discount"
                      checked={filters.sortBy === "discount"}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="sortDiscount" style={{ fontSize: "0.85rem" }}>
                      Discount
                    </label>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <h6 className="mb-2" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Category</h6>
                  {categories.map((cat) => (
                    <div className="form-check mb-1" key={cat}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id={`cat-${cat}`}
                        value={cat}
                        checked={filters.category === cat}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      />
                      <label className="form-check-label text-muted text-capitalize" htmlFor={`cat-${cat}`} style={{ fontSize: "0.85rem" }}>
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Price Range */}
                <div className="mb-3">
                  <h6 className="mb-2" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Price Range</h6>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceRange"
                      id="priceAll"
                      value="All"
                      checked={filters.priceRange === "All"}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="priceAll" style={{ fontSize: "0.85rem" }}>
                      All Prices
                    </label>
                  </div>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceRange"
                      id="priceUnder500"
                      value="under-500"
                      checked={filters.priceRange === "under-500"}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="priceUnder500" style={{ fontSize: "0.85rem" }}>
                      Under ₹500
                    </label>
                  </div>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceRange"
                      id="price500-2000"
                      value="500-2000"
                      checked={filters.priceRange === "500-2000"}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="price500-2000" style={{ fontSize: "0.85rem" }}>
                      ₹500 – ₹2000
                    </label>
                  </div>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceRange"
                      id="price2000-5000"
                      value="2000-5000"
                      checked={filters.priceRange === "2000-5000"}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="price2000-5000" style={{ fontSize: "0.85rem" }}>
                      ₹2000 – ₹5000
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceRange"
                      id="priceAbove5000"
                      value="above-5000"
                      checked={filters.priceRange === "above-5000"}
                      onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    />
                    <label className="form-check-label text-muted" htmlFor="priceAbove5000" style={{ fontSize: "0.85rem" }}>
                      Above ₹5000
                    </label>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h6 className="mb-2" style={{ fontWeight: "600", fontSize: "0.9rem" }}>Availability</h6>
                  <div className="form-check mb-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="availInStock"
                      checked={filters.inStock}
                      onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                    />
                    <label className="form-check-label text-muted" htmlFor="availInStock" style={{ fontSize: "0.85rem" }}>
                      In Stock
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="availOutOfStock"
                      checked={filters.outOfStock}
                      onChange={(e) => setFilters({ ...filters, outOfStock: e.target.checked })}
                    />
                    <label className="form-check-label text-muted" htmlFor="availOutOfStock" style={{ fontSize: "0.85rem" }}>
                      Out of Stock
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Products Grid */}
            <div className="col-9">
              {processedProducts.length === 0 ? (
                <div className="empty-state bg-white border rounded p-5">
                  <p className="mt-3 mb-0 text-muted fw-semibold">No products match your filters.</p>
                  <small className="text-muted">Try clearing your filters or search term to see more products.</small>
                </div>
              ) : (
                <div className="row g-4">
                  {processedProducts.map((product) => (
                    <div key={product._id} className="col-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;