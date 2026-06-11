import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../services/cartService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo) {
        toast.error("Please login first");
        return;
      }

      await addToCart({
        userId: userInfo._id,
        productId: product._id,
        title: product.title,
        description: product.description,
        mainImg: product.mainImg,
        quantity: 1,
        size: "",
        price: product.price,
        discount: product.discount,
      });

      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    }
  };

  if (!product) {
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.mainImg}
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
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {product.stock}
          </p>

          <button className="btn btn-primary"
            onClick={handleAddToCart}>
                 Add To Cart
            </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;