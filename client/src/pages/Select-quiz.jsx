import { useState, useContext, useEffect } from 'react';
import { gameContext } from '../providers/GameProvider';
import { types, questions } from '../data/gameData';
import TypeCard from '../components/typeCard';
import SelectDificulty from '../components/SelectDificulty';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const { resetGame } = useContext(gameContext);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(null);

  const createCards = () => {
    const cards = types.map(({id, name, difficulty, color}) => {
      const quantity = questions.filter(({ type_id }) => id === type_id).length
      return (
        <>
          <div
            onClick={ () => setSelected(null) }
            className="backpage"
          />
          <TypeCard
            key={ id }
            id={ id }
            title={ `.${name}()` }
            color={ color }
            quantity={ quantity }
            dificulty={ difficulty }
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
    const { id, name, color, difficulty } = types.find(({ id }) => id === active);
    const quantity = questions.filter((question) => question.type_id === id).length;
    return (
      <>
        <div
          onClick={ () => setActive(null) }
          className="backpage"
        />
        <TypeCard
          id={ id }
          title={ `.${name}()` }
          color={ color }
          quantity={ quantity }
          dificulty={ difficulty }
          jogar
          selected={ active }
          setActive={ setActive }
          setSelected={ setSelected }
        />
        <SelectDificulty color={ color } />
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
        { active ? renderCardActive() :createCards() }
      </div>
    </div>
  )
};

export default SelectQuiz;