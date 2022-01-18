import { useState } from 'react';
import { types, questions } from '../data/gameData';
import QuizCard from '../components/quizCard';
import SelectDificulty from '../components/SelectDificulty';
import '../css/Select-page.css';

const SelectQuiz = () => {
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
          <QuizCard
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
        <QuizCard
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
        <SelectDificulty />
      </>
    )
  }

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