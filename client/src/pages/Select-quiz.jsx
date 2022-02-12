import { useContext, useEffect } from 'react';
import { gameContext } from '../providers/GameProvider';
import { infoContext } from '../providers/InfoProvider';
import { typeCardsContext } from '../providers/TypeCardsProvider';
import TypeCards from '../components/typeCards';
import Menu from '../components/Menu';
import '../css/Select-page.css';

const SelectQuiz = () => {
  const { active, setSelected } = useContext(typeCardsContext);
  const { userInfo } = useContext(infoContext)
  const { resetGame } = useContext(gameContext);

  useEffect(() => resetGame(), []);

  return (
    <>
      <Menu path="quiz" />
      <div
        onClick={ () => setSelected(null) }
        className="backpage"
      />
      <div className="select-page">
        <h1 className="hero-title">Seleção de Quiz</h1>
        <div className="type-cards-container">
          { active && <TypeCards isActive /> }
          { userInfo && <TypeCards /> }
        </div>
      </div>
    </>
  )
};

export default SelectQuiz;