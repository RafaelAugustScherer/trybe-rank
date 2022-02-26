import axios from "axios";

const fetchUsers = async (token) => {
  if (!token) return;
  const users = await axios.get('https://trybe-rank-back.herokuapp.com/user/every')
    .then((res) => res.data);
  
  return users;
};

export {
  fetchUsers
};