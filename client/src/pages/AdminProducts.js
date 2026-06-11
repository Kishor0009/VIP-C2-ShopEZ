import React,
{
  useEffect,
  useState
}
from "react";

import {
  getProducts,
  deleteProduct
}
from "../services/productService";

import { toast }
from "react-toastify";

import {
  Link
} from
"react-router-dom";

const AdminProducts = () => {

  const [products,
    setProducts] =
    useState([]);

  const fetchProducts =
    async () => {

    const data =
      await getProducts();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete =
    async (id) => {

    await deleteProduct(id);

    toast.success(
      "Deleted"
    );

    fetchProducts();
  };

  return (
    <div className="container mt-4">

      <h2>
        Manage Products
      </h2>
      <Link
        to="/admin/add-product"
        className="btn btn-success mb-3"
         >
            Add Product
     </Link>

      {products.map(
        (product) => (

        <div
          key={product._id}
          className=
          "card p-3 mb-3"
        >

          <h5>
            {product.title}
          </h5>

          <p>
            ₹{product.price}
          </p>

          <button
            className=
            "btn btn-danger"
            onClick={() =>
              handleDelete(
                product._id
              )
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
};

export default AdminProducts;