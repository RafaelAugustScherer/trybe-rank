import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const infoContext = createContext();

const InfoProvider = ({ children }) => {
  const [tipos, setTipos] = useState([]);
  const [questoes, setQuestoes] = useState([]);

  const fetchQuestions = async () => {
    let bdQuestoes = await axios.get('http://localhost:5000/questions', JSON.stringify())
      .then(res => res.data);
    setQuestoes(bdQuestoes);
  };

  const fetchTypes = async () => {
    const bdTipos = await axios.get('http://localhost:5000/types')
      .then(res => res.data);
    setTipos(bdTipos);
  }

  useEffect(() => {
    fetchQuestions();
    fetchTypes();
  }, [])

  const value = {
    questoes,
    tipos
  }

  return (
    <infoContext.Provider value={ value }>
      { children }
    </infoContext.Provider>
  )
}

export default InfoProvider;
