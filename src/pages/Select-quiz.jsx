import { useState } from 'react';
import { types, questions } from '../data/gameData';
import QuizCard from '../components/quizCard';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const [selected, setSelected] = useState(null)

  const createCards = () => {
    const cards = types.map(({id, name, difficulty, color}) => {
      const quantity = questions.filter(({ type_id }) => id === type_id).length
      return (
        <QuizCard 
          id={ id }
          title={ name }
          color={ color }
          quantity={ quantity }
          dificulty={ difficulty }
          selected={ selected }
          setSelected={ setSelected }
        />
      )
    })
    return cards;
  };

  return (
    <div className="select-page">
      <h1 className="hero-title">Seleção de Quiz</h1>
      <div className="type-cards-container">
        { createCards() }
      </div>
    </div>
  )
};

export default SelectQuiz;