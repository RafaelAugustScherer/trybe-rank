import { useState, useContext, useEffect } from 'react';
import { gameContext } from '../providers/GameProvider';
import { infoContext } from '../providers/InfoProvider';
import { typeCardsContext } from '../providers/TypeCardsProvider';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProgressBar from './progressBar';

const TypeCard = ({ name, color, difficulty, completedQuestions, totalQuestions, activeCard }) => {
  const { questions } = useContext(infoContext);
  const { setType, getGameQuestions } = useContext(gameContext);
  const { selected, active, setSelected, setActive } = useContext(typeCardsContext);
  const [isSelected, setIsSelected] = useState(activeCard ? true : null);
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    if (activeCard) return;

    setIsSelected(selected === name);
    setIsActive(active === name);
  }, [selected, active]);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < difficulty; i += 1) {
      stars.push(<AiFillStar key={ `${name}-star-${i}` } />)
    }
    return stars;
  }

  const focusCard = () => {
    if (totalQuestions !==0) {
      !isSelected ? setSelected(name) : setSelected(null)
    }
  }

  return (
    <div
      onClick={ focusCard }
      className={ `card-container${isSelected ? ' selected' : ''}${totalQuestions === 0 ? ' card-disabled' : ''}` }
    >
      <div className="type-title">
        <div className="star-container">{ createStars() }</div>
        <h1 style={ { color: `#${color}` } }>{ `.${name}()` }</h1>
      </div>
      <div className="type-info">
        <ProgressBar
          id={ name }
          completed={ completedQuestions }
          total={ totalQuestions }
          active={ isSelected }
        />
        <p>{ `${totalQuestions} questões` }</p>
        <Link to="/quiz">
          <button
            type="button"
            onClick={ (e) => {
              if (isActive) {
                getGameQuestions(questions)
              } else {
                e.preventDefault();
                setType(name);
                setActive(name);
              }
            }}
          >
            { isActive ? 'Jogar' : 'Entrar' }
          </button>
        </Link>
      </div>
    </div>
  )
};

export default TypeCard;