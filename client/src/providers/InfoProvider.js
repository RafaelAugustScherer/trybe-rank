import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const infoContext = createContext();

const InfoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [types, setTypes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);

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

  const fetchUser = async () => {
    if (token === 'guest') {
      setNickname('Convidado');
      return;
    }
    const headers = { 'Authorization': `${token}` };
    const bdUser = await axios.get('http://localhost:5000/user', { headers })
      .then(({ data }) => data.user);
    console.log(bdUser);
    setNickname(bdUser.nickname);
    setUsername(bdUser.username);
    setCompletedQuestions(bdUser.completed_questions);
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
    nickname,
    username,
    token,
    setNickname,
    setUsername,
    setToken,
    completedQuestions
  }

  return (
    <infoContext.Provider value={ value }>
      { children }
    </infoContext.Provider>
  )
}

export default InfoProvider;
