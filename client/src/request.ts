import axios from "axios";
const baseUrl = "http://localhost:5000/api";

export const request = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});
