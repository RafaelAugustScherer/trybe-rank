import { useContext, useEffect, useState } from "react";
import { gameContext } from "../providers/GameProvider";

const QuizButton = ({ answers, correctAnswer }) => {
  const [questions, setQuestions] = useState([]);
  const { 
    gameIndex, 
    setGameIndex,
    userAnswers,
    setUserAnswers,
    gameQuestions, 
    acerto, 
    erro 
  } = useContext(gameContext);
  const [active, setActive] = useState(false);
  const last =  gameIndex + 1 === gameQuestions.length;

  const isActive = () => {
    const prevQuestion = userAnswers[gameIndex];
    if (prevQuestion) {
      setActive(true);
      setQuestions(prevQuestion.questions)
    }
  };

  const getOrder = () => {
    const entries = Object.entries(answers);
    const sortedEntries = [...entries].sort(() => Math.random() - 0.5);
    setQuestions(sortedEntries)
  }

  const resetButtons = () => {
    setQuestions([]);
    setActive(false);
  }

  const nextPage = () => {
    if (gameQuestions.length > gameIndex + 1) {
      setGameIndex(gameIndex + 1)
    }
  };

  const prevPage = () => {
    setGameIndex(gameIndex - 1)
  }

  const Buttons = () => {
    const Buttons = questions.map(([key, value]) => {
      const isCorrect = +key === +correctAnswer
      return (
        <button
          id={ key }
          disabled={ active }
          className={ `quiz-bot ${active ? isCorrect ? 'quiz-acerto' : 'quiz-erro' : '' }` }
          onClick={ () => {
            if (isCorrect) {
              acerto();
            } else {
              erro();
            }
            setUserAnswers([...userAnswers, { question_id: key, answer: value, questions }])
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
    isActive();
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
                }}
              >
                Prev
              </button>
            )
          }
          { last ? (
            <button>
              Finalizar
            </button>
          ) : (
            <button
              onClick={() => {
                resetButtons();
                nextPage();
              }}
            >
              Next
            </button>
          ) }
        </div>
      ) }
    </>
  )
}

export default QuizButton