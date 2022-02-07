import { useState, useContext, useEffect } from 'react';
import { gameContext } from '../providers/GameProvider';
import { infoContext } from '../providers/InfoProvider';
import TypeCard from '../components/typeCard';
import SelectDificulty from '../components/SelectDificulty';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(null);
  const { questions, types, userInfo } = useContext(infoContext)
  const { completed_questions: completedQuestions } = userInfo;
  const { resetGame } = useContext(gameContext);

  const createCards = () => {
    const cards = types.map(({name, color, difficulty}) => {
      const completedQuestionsByType = completedQuestions.filter(({ type }) => type === name).length;
      const quantity = questions.filter(({ type }) => type === name).length
      return (
        <div key={ `typeCard - ${name}` } className="container-type">
          <TypeCard
            id={ name }
            name={ name }
            color={ color }
            quantity={ quantity }
            dificulty={ difficulty }
            completedQuestions={ completedQuestionsByType }
            selected={ selected }
            setActive={ setActive }
            setSelected={ setSelected }
          />
        </div>
      )
    })
    return cards;
  };

  const renderCardActive = () => {
    const { name, color, difficulty } = types.find(({ name }) => name === active);
    const completedQuestionsByType = completedQuestions.filter(({ type }) => type === name).length;
    const quantity = questions.filter((question) => question.type === name).length;
    return (
      <>
        <div
          onClick={ () => {
            setActive(null);
          } }
          className="backpage on-active-card"
        />
        <div key={ `typeCard - ${name}` } className="active-card">
          <TypeCard
            name={ name }
            color={ color }
            quantity={ quantity }
            dificulty={ difficulty }
            play
            completedQuestions={ completedQuestionsByType }
            selected={ active }
            setActive={ setActive }
            setSelected={ setSelected }
          />
          <SelectDificulty color={ color } />
        </div>
      </>
    )
  }

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <>
      <div
        onClick={ () => {
          setSelected(null);
        } }
        className="backpage"
      />
      <div className="select-page">
        <h1 className="hero-title">Seleção de Quiz</h1>
        <div className="type-cards-container">
          { active && renderCardActive() }
          { completedQuestions && createCards() }
        </div>
      </div>
    </>
  )
};

export default SelectQuiz;