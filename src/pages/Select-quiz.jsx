import { types, questions } from '../data/gameData';
import QuizCard from '../components/quizCard';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const createCards = () => {
    const cards = types.map(({id, name, difficulty}) => {
      const quantity = questions.filter(({ type }) => id === type).length
      return (
        <QuizCard 
          id={ id } 
          title={ name }
          quantity={ quantity }
          dificulty={ difficulty } 
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