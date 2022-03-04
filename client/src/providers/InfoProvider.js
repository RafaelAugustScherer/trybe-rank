import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = process.env.REACT_APP_SERVER;

export const infoContext = createContext();

const InfoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(null);
  const [types, setTypes] = useState([]);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const questions = await axios.get(SERVER_URL + '/questions', JSON.stringify())
      .then(res => res.data);
    
    setQuestions(questions);
  };

  const fetchTypes = async () => {
    const bdTypes = await axios.get(SERVER_URL + '/types')
      .then(res => res.data);
    setTypes(bdTypes);
  };

  const fetchUser = async () => {
    if (token === 'guest') {
      setUserInfo({
        ...userInfo,
        username: 'Convidado',
        nickname: 'Convidado',
        image_url: '',
        completed_questions: [],
        completed_quizes: [],
        is_guest: true,
      });
      return;
    }
    const headers = { Authorization: token };
    const { _id, ...bdUser } = await axios.get(SERVER_URL + '/user', { headers })
      .then(({ data }) => data);
    setUserInfo(bdUser);
  }
  
  const getToken = async () => {
    const tokenCookie = getCookie('token');

    if (tokenCookie) {
      setToken(tokenCookie);
    } else {
      navigate('/');
    }
  }

  const updateUser = async () => {
    const { completed_questions, completed_quizes, is_guest: isGuest, ...fieldsToUpdate } = userInfo;
    if (isGuest) return;

    const headers = { Authorization: token };
    await axios
      .put(SERVER_URL + '/user', fieldsToUpdate, { headers })
      .catch((err) => new Error(err.message));
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
    setToken,
    updateUser
  }

  return (
    <infoContext.Provider value={ value }>
      { children }
    </infoContext.Provider>
  )
}

export default InfoProvider;
