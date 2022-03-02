import axios from "axios";

const fetchUsers = async (token) => {
  if (!token) return;
  const users = await axios.get('http://localhost:3000/user/every')
    .then((res) => res.data);
  
  return users;
};

export {
  fetchUsers
};