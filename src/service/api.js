import axios from "axios";
const url = "http://localhost:3001/events";
const url2 = "http://localhost:3001/wishlist";

export const getallEvents = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};
export const addEvent = async (event) => {
  return await axios.post(url, event);
};
export const editEvent = async (id, event) => {
  return await axios.put(`${url}/${id}`, event);
};
export const deleteEvent = async (id) => {
  return await axios.delete(`${url}/${id}`);
};
export const getWishlist = async (id) => {
  id = id || "";
  return await axios.get(`${url2}/${id}`);
};
export const addWishlist = async (event) => {
  return await axios.post(url2, event);
};
export const deleteEventFromWishlist = async (id) => {
  return await axios.delete(`${url2}/${id}`);
};
