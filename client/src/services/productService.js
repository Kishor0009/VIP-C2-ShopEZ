import axios from "axios";
import { getAuthConfig }from "../utils/authConfig";

const API_URL = "https://shopez-backend-7mm7.onrender.com/api/products";

const getConfig = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteProduct =
  async (id) => {

  const response =
    await axios.delete(
      `${API_URL}/${id}`,
      getAuthConfig()
    );

  return response.data;
};