import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = process.env.REACT_APP_SERVER;
console.log(process.env)

export const infoContext = createContext();

const InfoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    completed_questions: []
  });
  const [token, setToken] = useState(null);
  const [types, setTypes] = useState([]);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const questions = await axios.get(`${SERVER_URL}/questions`, JSON.stringify())
      .then(res => res.data);
    
    setQuestions(questions);
  };

  const fetchTypes = async () => {
    const bdTypes = await axios.get(`${SERVER_URL}/types`)
      .then(res => res.data);
    setTypes(bdTypes);
  };

  const fetchUser = async () => {
    if (token === 'guest') {
      setUserInfo({
        ...userInfo,
        username: 'Convidado',
        nickname: 'Convidado'
      });
      return;
    }
    const headers = { Authorization: token };
    const bdUser = await axios.get(`${SERVER_URL}/user`, { headers })
      .then(({ data }) => data);
    setUserInfo({ ...bdUser });
  }
  
  const getToken = async () => {
    const tokenCookie = getCookie('token');

    if (tokenCookie) {
      setToken(tokenCookie);
    } else {
      navigate('/');
    }
  }

  useEffect(() => {
    getToken();
    fetchQuestions();
    fetchTypes();
  }, []);

  useEffect(() => {
    token && fetchUser();
  }, [token]);

  const value = {
    questions,
    types,
    token,
    userInfo,
    getToken,
    setUserInfo,
    setToken
  }

  return (
    <infoContext.Provider value={ value }>
      { children }
    </infoContext.Provider>
  )
}

export default InfoProvider;
