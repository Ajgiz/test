import axios from "axios";
const baseUrl = "http://localhost:3001/api";

export const request = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});
