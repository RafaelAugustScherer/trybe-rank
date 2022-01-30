import { createContext, useState } from "react";

export const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('Iniciante');
  const [userAnswers, setUserAnswers] = useState([]);
  const [pontos, setPontos] = useState(0);
  const [streak, setStreak] = useState(0);

  const getGameQuestions = (questions) => {
    if (!type) return;
    const questionsType = questions.filter((questao) => (
      questao.type === type
      && questao.difficulty === difficulty
    ));
    const randomQuestions = [...questionsType].sort(() => Math.random() - 0.5);
    setGameQuestions(randomQuestions.slice(0, 5));
  }

  const acerto = () => {
    const newPontuation = pontos + 10 + (streak + 1) * 5;
    setPontos(newPontuation);
    setStreak(streak + 1);
  }

  const erro = () => {
    setStreak(0)
  }

  const resetGame = () => {
    setType(null);
    setGameQuestions([]);
    setPontos(0);
    setStreak(0);
  }

  const value = {
    type,
    gameQuestions,
    gameIndex,
    userAnswers,
    difficulty,
    pontos,
    acerto,
    erro,
    setType,
    setDifficulty,
    getGameQuestions,
    resetGame,
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
