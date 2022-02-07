import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

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
    let bdQuestions = await axios.get('http://localhost:5000/questions', JSON.stringify())
      .then(res => res.data);
    setQuestions(bdQuestions);
  };

  const fetchTypes = async () => {
    const bdTypes = await axios.get('http://localhost:5000/types')
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
    const headers = { 'Authorization': `${token}` };
    const bdUser = await axios.get('http://localhost:5000/user', { headers })
      .then(({ data }) => data.user);
    setUserInfo({ ...bdUser });
  }
  
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
    token && fetchUser();
  }, [token]);

  const value = {
    questions,
    types,
    token,
    userInfo,
    setToken,
    setUserInfo,
  }

  return (
    <infoContext.Provider value={ value }>
      { children }
    </infoContext.Provider>
  )
}

export default InfoProvider;
