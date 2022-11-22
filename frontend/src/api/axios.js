import axios from "axios";

let BASE_URL;
if (process.env.REACT_APP_NODE_ENV === "production") {
  BASE_URL = process.env.REACT_APP_BASE_URL;
} else {
  BASE_URL = "http://localhost:5000/api";
}

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
