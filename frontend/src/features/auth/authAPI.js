import api from "../../services/axios";

export const loginAPI = (data) => api.post("/login", data);
export const registerAPI = (data) => api.post("/register", data);
export const getMeAPI = () => api.get("/me");