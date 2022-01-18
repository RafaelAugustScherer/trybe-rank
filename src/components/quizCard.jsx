import { AiFillStar } from 'react-icons/ai';
import ProgressBar from './progressBar';

const QuizCard = ({ id, title, quantity, dificulty, color, selected, setSelected }) => {
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < dificulty; i += 1) {
      stars.push(<AiFillStar />)
    }
    return stars;
  }

  return (
    <button
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
        <button
          type="button"
          onClick={ (e) => {
            e.preventDefault();
          }}
        >
          Entrar
        </button>
      </div>
    </button>
  )
};

export default QuizCard;