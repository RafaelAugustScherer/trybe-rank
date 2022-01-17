import { createContext, useState } from "react";

export const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [type, setType] = useState('');
  const [gameIndex, setGameIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const value = {
    type,
    gameIndex,
    questions,
    userAnswers,
    setType,
    setGameIndex,
    setQuestions,
    setUserAnswers
  }

  return (
    <gameContext.Provider value={ value }>
      { children }
    </gameContext.Provider>
  )
};

export default GameProvider;
