import { useState, useContext, useEffect } from 'react';
import { gameContext } from '../providers/GameProvider';
import { infoContext } from '../providers/InfoProvider';
import axios from 'axios';
import TypeCard from '../components/typeCard';
import SelectDificulty from '../components/SelectDificulty';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(null);
  const [completedQuestions, setCompletedQuestions] = useState(null);
  const { questions, types, token } = useContext(infoContext)
  const { resetGame } = useContext(gameContext);

  const fetchCompletedQuestions = async () => {
    const headers = { 'Authorization': `${token}` };
    const data = await axios.get('http://localhost:5000/user', { headers })
      .then((res) => res.data)
      .then(({ user: { completed_questions } }) => completed_questions);
  
    setCompletedQuestions(data);
  }

  const createCards = () => {
    const cards = types.map(({name, color, difficulty}, index) => {
      const completedQuestionsByType = completedQuestions.filter(({ type }) => type === name).length;
      const quantity = questions.filter(({ type }) => type === name).length
      return (
        <div className="container-type">
          <TypeCard
            key={ `typeCard - ${index}` }
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
    const quantity = questions.filter((question) => question.type === name).length;
    return (
      <>
        <div
          onClick={ () => {
            setActive(null);
          } }
          className="backpage on-active-card"
        />
        <div className="active-card">
          <TypeCard
            name={ name }
            color={ color }
            quantity={ quantity }
            dificulty={ difficulty }
            play
            completedQuestions={ completedQuestions }
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
    fetchCompletedQuestions();
    resetGame();
  }, [])

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