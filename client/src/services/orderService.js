import axios from "axios";
import { getAuthConfig } from "../utils/authConfig";

const API_URL =
  "http://localhost:5000/api/orders";

export const getUserOrders = async (
  userId
) => {

  const response = await axios.get(
    `${API_URL}/user/${userId}`,
    getAuthConfig()
  );

  return response.data;
};