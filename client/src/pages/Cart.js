import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCartItems,
  removeCartItem,
} from "../services/cartService";

import { toast } from "react-toastify";

const Cart = () => {

  const [items, setItems] = useState([]);

  const fetchCart = async () => {

    const data = await getCartItems();

    setItems(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteItem = async (id) => {

    await removeCartItem(id);

    toast.success("Removed");

    fetchCart();
  };

  return (
    <div className="container mt-4">

      <h2>My Cart</h2>

      {items.map((item) => (

        <div
          key={item._id}
          className="card p-3 mb-3"
        >

          <div className="row align-items-center">

            <div className="col-md-2">

              <img
                src={item.mainImg}
                alt=""
                className="img-fluid"
              />

            </div>

            <div className="col-md-6">

              <h5>{item.title}</h5>

              <p>₹{item.price}</p>

            </div>

            <div className="col-md-2">

              Qty: {item.quantity}

            </div>

            <div className="col-md-2">

              <button
                className="btn btn-danger"
                onClick={() =>
                  deleteItem(item._id)
                }
              >
                Remove
              </button>

            </div>
            <div className="text-end mt-4">

  <Link
    to="/checkout"
    className="btn btn-success"
  >
    Proceed To Checkout
  </Link>

</div>

          </div>

        </div>

      ))}

    </div>
  );
};

export default Cart;