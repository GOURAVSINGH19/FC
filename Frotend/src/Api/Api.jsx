import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:8000/users",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// axios.defaults.headers = {
//     "Content-Type": "application/json",
// }
// axios.defaults.baseURL = "http://localhost:8000/users"
// axios.defaults.withCredentials=true

export const getUsers = (code) => axios.get(`/google?code=${code}`);
