import axios from "axios";

const api = axios.create({
  baseURL: "https://67c091e4b9d02a9f224a4a33.mockapi.io/api",
});

export default api;
