import { useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { gameContext } from '../providers/GameProvider';
import ProgressBar from './progressBar';

const TypeCard = ({ id, jogar, name, quantity, dificulty, color, selected, setSelected, setActive }) => {
  const { setTipo } = useContext(gameContext);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < dificulty; i += 1) {
      stars.push(<AiFillStar key={ i } />)
    }
    return stars;
  }

  return (
    <div
      onClick={ () => selected !== name ? setSelected(name) : setSelected(null) }
      className={ `type-container ${selected === name ? 'active' : ''}` }
    >
      <div className="type-title">
        <div className="star-container">{ createStars() }</div>
        <h1 style={ { 'color': `#${color}` } }>{ `.${name}()` }</h1>
      </div>
      <div className="type-info">
        <ProgressBar
          id={ id }
          active={ selected === name }
          quantity={ quantity }
          selected={ selected }
        />
        <p>{ `${quantity} questões` }</p>
        <Link to="/quiz">
          <button
            type="button"
            onClick={ (e) => {
              if (jogar) {
                setTipo(name);
              } else {
                e.preventDefault();
                setActive(name);
              }
            }}
          >
            { jogar ? 'Jogar' : 'Entrar' }
          </button>
        </Link>
      </div>
    </div>
  )
};

export default TypeCard;