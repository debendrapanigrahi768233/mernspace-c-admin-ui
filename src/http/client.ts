import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true, //By doing this cookie will store in browser and with request also cookie will be sent
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
