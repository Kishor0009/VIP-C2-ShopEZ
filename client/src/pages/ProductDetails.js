import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {

      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(response.data);
    };

    fetchProduct();

  }, [id]);



  if (!product) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">

      <div className="row">

        <div className="col-md-6">

          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
          />

        </div>

        <div className="col-md-6">

          <h2>{product.title}</h2>

          <h4 className="text-success">
            ₹{product.price}
          </h4>

          <p>{product.description}</p>

          <p>
            <strong>Category:</strong>
            {" "}
            {product.category}
          </p>

          <p>
            <strong>Stock:</strong>
            {" "}
            {product.stock}
          </p>

          <button className="btn btn-primary">
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;