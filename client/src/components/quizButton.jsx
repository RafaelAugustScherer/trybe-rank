import { useContext, useEffect, useState } from "react";
import { gameContext } from "../providers/GameProvider";

const QuizButton = ({ answers, correctAnswer, last }) => {
  const [questions, setQuestions] = useState([]);
  const { gameIndex, nextPage, prevPage, acerto, erro } = useContext(gameContext);
  const [active, setActive] = useState(false);

  const getOrder = () => {
    const entries = Object.entries(answers);
    const sortedEntries = [...entries].sort(() => Math.random() - 0.5);
    setQuestions(sortedEntries)
  }

  const resetButtons = () => {
    setQuestions([]);
    setActive(false);
  }

  const Buttons = () => {
    const Buttons = questions.map(([key, value]) => {
      const isCorrect = +key === +correctAnswer
      return (
        <button
          disabled={ active }
          className={ `quiz-bot ${active ? isCorrect ? 'quiz-acerto' : 'quiz-erro' : '' }` }
          onClick={ () => {
            if (isCorrect) {
              acerto();
            } else {
              erro();
            }
            setActive(true);
          } }
        >
          { value }
        </button>
      )
    });
    return Buttons;
  }

  useEffect(() => {
    getOrder();
  }, [gameIndex]);

  return (
    <>
      <div className="quiz-bot-container">
        { Buttons() }
      </div>
      { active && (
        <div>
          {
            gameIndex > 0 && (
              <button
                onClick={() => {
                  prevPage();
                  if (gameIndex > 0) {
                    setQuestions([]);
                  }
                }}
              >
                Prev
              </button>
            )
          }
          <button
            onClick={() => {
              resetButtons();
              nextPage();
            }}
          >
            { last ? 'Finalizar' : 'Next' }
          </button>
        </div>
      ) }
    </>
  )
}

export default QuizButton