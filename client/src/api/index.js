import axios from "axios";

// api url (where your serve is hosted at)
export const backendUrl = "https://calendar-server3343.herokuapp.com";

// axios configuration
export default axios.create({
  baseURL: backendUrl,
});
