import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER;

const fetchUsers = async (token) => {
  if (!token) return;
  const users = await axios.get(`${SERVER_URL}/user/every`)
    .then((res) => res.data);
  
  return users;
};

export {
  fetchUsers
};