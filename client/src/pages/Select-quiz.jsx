import { useState, useContext, useEffect } from 'react';
import { gameContext } from '../providers/GameProvider';
import TypeCard from '../components/typeCard';
import SelectDificulty from '../components/SelectDificulty';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(null);
  const { questoes, tipos, resetGame } = useContext(gameContext);

  const createCards = () => {
    const cards = tipos.map(({nome, cor, dificuldade}) => {
      console.log(questoes);
      const quantity = questoes.filter(({ tipo }) => tipo === nome).length
      return (
        <>
          <div
            onClick={ () => setSelected(null) }
            className="backpage"
          />
          <TypeCard
            key={ nome }
            name={ nome }
            color={ cor }
            quantity={ quantity }
            dificulty={ dificuldade }
            selected={ selected }
            setActive={ setActive }
            setSelected={ setSelected }
          />
        </>
      )
    })
    return cards;
  };

  const renderCardActive = () => {
    const { nome, cor, dificuldade } = tipos.find(({ nome }) => nome === active);
    const quantity = questoes.filter((question) => question.tipo === nome).length;
    return (
      <>
        <div
          onClick={ () => setActive(null) }
          className="backpage"
        />
        <TypeCard
          name={ nome }
          color={ cor }
          quantity={ quantity }
          dificulty={ dificuldade }
          jogar
          selected={ active }
          setActive={ setActive }
          setSelected={ setSelected }
        />
        <SelectDificulty color={ cor } />
      </>
    )
  }

  useEffect(() => {
    resetGame();
  }, [])

  return (
    <div className="select-page">
      <h1 className="hero-title">Seleção de Quiz</h1>
      <div className="type-cards-container">
        { active ? renderCardActive() : createCards() }
      </div>
    </div>
  )
};

export default SelectQuiz;