import { useContext, useEffect, useState } from "react";
import { gameContext } from "../providers/GameProvider";

const QuizButton = ({ answers, correctAnswer }) => {
  const [questions, setQuestions] = useState([]);
  const [quizSelected, setQuizSelected] = useState(null);
  const { 
    gameIndex,
    gameQuestions,
    setGameIndex,
    userAnswers,
    setUserAnswers,
    acerto, 
    erro 
  } = useContext(gameContext);
  const [active, setActive] = useState(false);
  const last =  gameIndex + 1 === gameQuestions.length;

  const isActive = () => {
    const currentQuestion = userAnswers[gameIndex];
    if (currentQuestion) {
      setActive(true);
      setQuestions(currentQuestion.questions)
      setQuizSelected(currentQuestion.question_id)
    }
  };

  const getOrder = () => {
    const entries = Object.entries(answers);
    const sortedEntries = [...entries].sort(() => Math.random() - 0.5);
    setQuestions(sortedEntries);
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
      const isCorrect = key === correctAnswer
      return (
        <button
          key={ key }
          disabled={ active }
          className={ `
            quiz-bot 
            ${active ? isCorrect ? 'quiz-acerto' : 'quiz-erro' : '' }
            ${quizSelected === key ? 'quiz-selected' : ''}
          ` }
          onClick={ () => {
            if (isCorrect) {
              acerto();
            } else {
              erro();
            }
            setQuizSelected(key)
            setUserAnswers([...userAnswers, { question_id: key, answer: value, questions}])
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
        <div className="next-prev-buttons">
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