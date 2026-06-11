import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

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
  const response = await axios.get(
    API_URL,
    getConfig()
  );

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getConfig()
  );

  return response.data;
};