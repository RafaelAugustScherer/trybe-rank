import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const infoContext = createContext();

const InfoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState(null);
  const [token, setToken] = useState(null);
  const [types, setTypes] = useState([]);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    let bdQuestions = await axios.get('http://localhost:5000/questions', JSON.stringify())
      .then(res => res.data);
    setQuestions(bdQuestions);
  };

  const fetchTypes = async () => {
    const bdTypes = await axios.get('http://localhost:5000/types')
      .then(res => res.data);
    setTypes(bdTypes);
  }

  const fetchUsers = async () => {
    if (!token) return;
    const headers = { 'Authorization': `${token}` }

    const { users } = await axios.get('http://localhost:5000/users', { headers })
      .then((res) => res.data);
    
    setUsers(users);
  };

  const GetToken = async () => {
    const tokenCookie = getCookie('token');

    if (tokenCookie) {
      setToken(tokenCookie);
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    GetToken();
    fetchQuestions();
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [token])

  const value = {
    users,
    questions,
    types,
    nickname,
    token,
    setNickname,
    setToken
  }

  return (
    <infoContext.Provider value={ value }>
      { children }
    </infoContext.Provider>
  )
}

export default InfoProvider;
