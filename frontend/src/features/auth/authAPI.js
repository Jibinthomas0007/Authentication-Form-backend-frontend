import API from "../../services/api";

export const loginAPI = (data) => API.post("/login", data);
export const registerAPI = (data) => API.post("/register", data);
export const getMeAPI = () => API.get("/me");