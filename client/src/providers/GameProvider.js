import { createContext, useEffect, useState } from "react";
import { questions } from "../data/gameData";

export const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [gameIndex, setGameIndex] = useState(0);
  const [dificulty, setDificulty] = useState(1);
  const [gameQuestions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const getQuestions = () => {
    if (!type) return;
    const typeQuestions = questions
    .filter(({ type_id, dificuldade: diff }) => type_id === type && dificulty === diff);
    const randomQuestions = [...typeQuestions].sort(() => Math.random() - 0.5);
    setQuestions(randomQuestions.slice(0, 5));
  }

  useEffect(() => {
    getQuestions()
  }, [type])

  const value = {
    type,
    gameIndex,
    gameQuestions,
    userAnswers,
    dificulty,
    setDificulty,
    setType,
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