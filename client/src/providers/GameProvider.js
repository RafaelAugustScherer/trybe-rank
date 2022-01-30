import { createContext, useState } from "react";

export const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('Iniciante');
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
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

  const handleRightAnswer = () => {
    const newPontuation = score + 10 + (streak + 1) * 5;
    setScore(newPontuation);
    setStreak(streak + 1);
  }

  const handleWrongAnswer = () => {
    setStreak(0)
  }

  const resetGame = () => {
    setType(null);
    setGameQuestions([]);
    setScore(0);
    setStreak(0);
  }

  const value = {
    type,
    gameQuestions,
    gameIndex,
    userAnswers,
    difficulty,
    score,
    handleRightAnswer,
    handleWrongAnswer,
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
