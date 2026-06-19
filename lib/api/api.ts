import axios from "axios";

export const api = axios.create({
  baseURL: "https://09-auth-nine-pied.vercel.app/api",
  withCredentials: true,
});
