import { useState } from "react";
import { AiFillStar } from 'react-icons/ai';

const QuizCard = ({ id, title, quantity, dificulty, color }) => {
  const [active, setActive] = useState(false);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < dificulty; i += 1) {
      stars.push(<AiFillStar />)
    }
    return stars;
  }

  return (
    <div
      onClick={() => setActive(!active)}
      className={ `type-container ${active ? 'active' : ''}` }
    >
      <div>
        <div className="star-container">{ createStars() }</div>
        <h1 style={ { 'color': `#${color}` } }>{ title }</h1>
      </div>
      <div className="type-info">
        <p>{ `${quantity} questões` }</p>
        <button
          type="button"
        >
          Entrar
        </button>
      </div>
    </div>
  )
};

export default QuizCard;