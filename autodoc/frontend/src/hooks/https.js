import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.102:3000/api",
  headers: {
    "Content-Type": "aplication/json",
  },
});

export default axiosInstance;
