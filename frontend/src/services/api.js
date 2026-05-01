import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

let isRefreshing = false;
let failedQueue = [];

// 🔄 Process queued requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

/* =========================
   REQUEST INTERCEPTOR
========================= */

API.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

/* =========================
   RESPONSE INTERCEPTOR
========================= */

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 🔥 Handle token expiry
    if (error.response?.status === 401 && !originalRequest._retry) {

      // ❗ skip login/register
      if (
        originalRequest.url.includes("/login") ||
        originalRequest.url.includes("/register")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = "Bearer " + token;
          return API(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const auth = JSON.parse(localStorage.getItem("auth"));

        const res = await axios.post(
          "http://127.0.0.1:8000/api/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        // 🔥 adjust based on your backend response
        const newToken = res.data.data.token;

        // 🔥 update storage
        const updatedAuth = {
          ...auth,
          token: newToken,
        };

        localStorage.setItem("auth", JSON.stringify(updatedAuth));

        processQueue(null, newToken);

        originalRequest.headers.Authorization = "Bearer " + newToken;

        return API(originalRequest);

      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("auth");

        // 🔥 redirect safely
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;