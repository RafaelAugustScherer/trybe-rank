import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const infoContext = createContext();

const InfoProvider = ({ children }) => {
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

  const getToken = async () => {
    document.cookie = 'token='
    let tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    .split('=')[1];
    
    if (tokenCookie) {
      setToken(tokenCookie);
    }
    console.log(tokenCookie);
  }

  useEffect(() => {
    getToken();
    fetchQuestions();
    fetchTypes();
  }, []);

  const value = {
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
