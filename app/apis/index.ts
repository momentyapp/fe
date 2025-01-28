import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://solid-computing-machine-45v95qwrpqx3qx99-8081.app.github.dev/api/",
});

export default axiosInstance;
