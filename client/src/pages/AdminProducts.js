import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    toast.success("Deleted");
    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h2 className="section-title mb-0">
          Manage Products
        </h2>
        <Link to="/admin/add-product" className="btn btn-success">
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p className="mt-3">No products found.</p>
        </div>
      ) : (
        <>
          <div className="row mb-3">
            <div className="col-md-6 col-lg-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search products by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p className="mt-3">No products match your search.</p>
            </div>
          ) : (
            <div className="card form-card">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th style={{ width: "15%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{product.title}</td>
                        <td>
                          <span className="badge bg-light text-secondary">
                            {product.category}
                          </span>
                        </td>
                        <td style={{ color: "#4361ee", fontWeight: "600" }}>
                          ₹{product.price}
                        </td>
                        <td>{product.stock}</td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProducts;