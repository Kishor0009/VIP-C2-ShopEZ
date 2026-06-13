import axios from "axios";

const API_URL = "https://shopez-backend-7mm7.onrender.com/api/cart";

export const addToCart = async (cartData) => {
  const response = await axios.post(API_URL, cartData);
  return response.data;
};

export const getCartItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const removeCartItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};