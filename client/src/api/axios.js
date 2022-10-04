import axios from "axios";

const BASE_URL = "http://localhost:5001/api/v1/";
const TOKEN = localStorage.getItem("accessToken");

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});
