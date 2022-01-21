import { createContext, useState } from "react";

export const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [tipo, setTipo] = useState(null);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [dificuldade, setDificuldade] = useState('Iniciante');
  const [userAnswers, setUserAnswers] = useState([]);
  const [pontos, setPontos] = useState(0);
  const [streak, setStreak] = useState(0);

  const getGameQuestions = (questoes) => {
    if (!tipo) return;
    const questoesTipo = questoes.filter((questao) => (
      questao.tipo === tipo
      && questao.dificuldade === dificuldade
    ));
    const randomQuestoes = [...questoesTipo].sort(() => Math.random() - 0.5);
    setGameQuestions(randomQuestoes.slice(0, 5));
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
    setTipo(null);
    setGameQuestions([]);
    setPontos(0);
    setStreak(0);
  }

  const value = {
    tipo,
    gameQuestions,
    gameIndex,
    userAnswers,
    dificuldade,
    pontos,
    acerto,
    erro,
    setTipo,
    setDificuldade,
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
