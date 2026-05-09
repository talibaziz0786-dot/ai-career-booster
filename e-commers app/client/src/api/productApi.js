import axios from "axios";

const API = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
  const { data } = await axios.get(API);
  return data;
};