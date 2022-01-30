import { useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { gameContext } from '../providers/GameProvider';
import ProgressBar from './progressBar';

const TypeCard = ({ id, play, title, quantity, dificulty, color, selected, setSelected, setActive }) => {
  const { setType } = useContext(gameContext);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < dificulty; i += 1) {
      stars.push(<AiFillStar key={ i } />)
    }
    return stars;
  }

  return (
    <div
      onClick={ () => selected !== id ? setSelected(id) : setSelected(null) }
      className={ `type-container ${selected === id ? 'active' : ''}` }
    >
      <div className="type-title">
        <div className="star-container">{ createStars() }</div>
        <h1 style={ { 'color': `#${color}` } }>{ title }</h1>
      </div>
      <div className="type-info">
        <ProgressBar
          id={ id }
          active={ selected === id }
          quantity={ quantity }
          selected={ selected }
        />
        <p>{ `${quantity} questões` }</p>
        <Link to="/quiz">
          <button
            type="button"
            onClick={ (e) => {
              if (play) {
                setType(id);
              } else {
                e.preventDefault();
                setActive(id)
              }
            }}
          >
            { play ? 'Jogar' : 'Entrar' }
          </button>
        </Link>
      </div>
    </div>
  )
};

export default TypeCard;