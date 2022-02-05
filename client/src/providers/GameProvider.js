import { createContext, useState } from "react";

export const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [difficulty, setDifficulty] = useState('Iniciante');
  const [userAnswers, setUserAnswers] = useState([]);
  const [hits, setHits] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const getGameQuestions = (questions) => {
    if (!type) return;
    const questionsType = questions.filter((questao) => (
      questao.type === type
      && questao.difficulty === difficulty
    ));
    const randomQuestions = [...questionsType].sort(() => Math.random() - 0.5);
    setGameQuestions(randomQuestions.slice(0, 5));
  }

  const handleAnswer = (isCorrect, answer) => {
    if (isCorrect) {
      const newPontuation = score + 10 + (streak + 1) * 5;
      setScore(newPontuation);
      setHits(hits + 1);
      setStreak(streak + 1);
      if (streak + 1 > bestStreak) setBestStreak(streak + 1);
    }
    else {
      setStreak(0);
    }
    setUserAnswers([...userAnswers, answer]);
  }

  const resetGame = () => {
    setType(null);
    setGameQuestions([]);
    setUserAnswers([]);
    setGameIndex(0);
    setScore(0);
    setHits(0);
    setStreak(0);
    setBestStreak(0);
  }

  const value = {
    type,
    gameQuestions,
    gameIndex,
    userAnswers,
    difficulty,
    hits,
    bestStreak,
    score,
    handleAnswer,
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
