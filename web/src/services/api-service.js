import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {

    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('user')
      window.location.assign('/login')
    }
    else {
      return Promise.reject(error);
    }
    return Promise.reject(error);

  }
);

const login = (user) => http.post("/sessions", user);
const logout = () => http.delete("/sessions");

const register = (user) => http.post("/users", user);
const userUpdate = (user) => http.patch("/users/me", user);

const skillCreate = (skill) => http.post("/skills", skill);
const skillUpdate = (skill) => http.patch("/skills", skill);
const skillDelete = (skill) => http.delete(`/skills/${skill}`);
const skillList = () => http.get("/skills");
const skillDetail = (id) => http.get(`/skills/${id}`);

const messagesSend = (message) => http.post("/messages", message);
const messageMe = (message) => http.get("/messages", message);
const messageDetail = (receiver) => http.get(`/messages/${receiver}`);

const ratingDetail = (id) => http.get(`/ratings/${id}`);
const ratingCreate = (rating) => http.post("/ratings", rating);

const profile = () => http.get("/users/me");
// return http.get("/events", { params: { city, limit, page, lat, lng } });

// const deleteEvent = (id) => http.delete(`/events/${id}`);


export {
  login, logout, register, userUpdate,
  skillCreate, skillDelete, skillList, skillDetail, skillUpdate,
  messageDetail, messageMe, messagesSend,
  ratingCreate, ratingDetail,
  profile
};
