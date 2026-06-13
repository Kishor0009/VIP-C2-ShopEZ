import axios from "axios";
import { getAuthConfig } from "../utils/authConfig";

const API_URL =
  "https://shopez-backend-7mm7.onrender.com/api/orders";

export const getUserOrders = async (
  userId
) => {

  const response = await axios.get(
    `${API_URL}/user/${userId}`,
    getAuthConfig()
  );

  return response.data;
};