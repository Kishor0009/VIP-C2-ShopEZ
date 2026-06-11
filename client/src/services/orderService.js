import axios from "axios";

const API_URL =
  "http://localhost:5000/api/orders";

export const getUserOrders = async (
  userId
) => {

  const response = await axios.get(
    `${API_URL}/user/${userId}`
  );

  return response.data;
};