import { createContext, useEffect, useState } from "react";
import axios from 'axios';
// import { questions } from "../data/gameData";

export const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [tipo, setTipo] = useState(null);
  const [gameIndex, setGameIndex] = useState(0);
  const [dificuldade, setDificuldade] = useState('Iniciante');
  const [questoes, setQuestoes] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [pontos, setPontos] = useState(0);
  const [streak, setStreak] = useState(0);

  const fetchQuestions = async () => {
    let bdQuestoes = await axios.get('http://localhost:5000/questions', JSON.stringify())
      .then(res => res.data);
    setQuestoes(bdQuestoes);
    console.log(bdQuestoes);
  };

  const filterQuestions = () => {
    if (!tipo) return;
    const questoesTipo = questoes.filter((questao) => questao.tipo === tipo);
    const randomQuestoes = [...questoesTipo].sort(() => Math.random() - 0.5);
    setQuestoes(randomQuestoes.slice(0, 5));
  }

  const fetchTypes = async () => {
    const bdTipos = await axios.get('http://localhost:5000/types')
      .then(res => res.data);
    setTipos(bdTipos);
  }

  /*
  const getQuestions = () => {
    fetchQuestions();
    if (!tipo) return;
    const typeQuestions = questions
    .filter(({ type_id, dificuldade: diff }) => type_id === tipo && dificuldade === diff);
    const randomQuestions = [...typeQuestions].sort(() => Math.random() - 0.5);
    setQuestoes(randomQuestions.slice(0, 5));
  }
  */

  const acerto = () => {
    const newPontuation = pontos + 10 + (streak + 1) * 5;
    setPontos(newPontuation);
    setStreak(streak + 1);
  }

  const erro = () => {
    setStreak(0);
  }

  useEffect(() => {
    filterQuestions();
    //eslint-disable-next-line
  }, [tipo]);

  useEffect(() => {
    fetchQuestions();
    fetchTypes();
  }, []);

  const value = {
    tipo,
    gameIndex,
    questoes,
    tipos,
    userAnswers,
    dificuldade,
    pontos,
    acerto,
    erro,
    setDificuldade,
    setTipo,
    setGameIndex,
    setUserAnswers
  }

  return (
    <gameContext.Provider value={ value }>
      { children }
    </gameContext.Provider>
  )
};

export default GameProvider;
