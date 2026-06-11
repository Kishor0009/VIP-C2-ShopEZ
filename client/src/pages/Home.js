import React, { useEffect, useState } from "react";

import { getProducts } from "../services/productService";

import ProductCard from "../components/ProductCard";

const Home = () => {

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



  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Latest Products
      </h2>

      <div className="row">

        {products.map((product) => (

          <div
            key={product._id}
            className="col-md-4 mb-4"
          >

            <ProductCard product={product} />

          </div>

        ))}

      </div>

    </div>
  );
};

export default Home;