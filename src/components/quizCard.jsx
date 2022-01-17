import { useState } from "react";

const QuizCard = ({ id, title, quantity, dificulty }) => {
  const [active, setActive] = useState(false);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < dificulty; i += 1) {

    }
    return stars;
  }

  return (
    <div
      onClick={() => setActive(!active)}
      className={ `type-container ${active ? 'active' : ''}` }
    >
      <div>{ createStars() }</div>
      <h1>{ title }</h1>
      <p>{ `${quantity} questões` }</p>
      <button
        type="button"
      >
        Entrar
      </button>
    </div>
  )
};

export default QuizCard;