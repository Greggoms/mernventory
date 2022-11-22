import axios from "axios";

let BASE_URL;
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:5000/api";
} else {
  BASE_URL = "https://mernventory.cyclic.app/api";
}

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
