import { useContext, useEffect, useState } from "react";
import { gameContext } from "../providers/GameProvider";
import { infoContext } from "../providers/InfoProvider";
import axios from 'axios';
import { Link } from "react-router-dom";

const QuizButton = ({ answers, correctAnswer }) => {
  const [questions, setQuestions] = useState([]);
  const [quizSelected, setQuizSelected] = useState(null);
  const { token } = useContext(infoContext)
  const {
    type,
    gameIndex,
    gameQuestions,
    setGameIndex,
    userAnswers,
    setUserAnswers,
    handleAnswer
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

  const resetQuestions = () => {
    setQuestions([]);
    setActive(false);
  }

  const finishGame = () => {
    const correctAnswer = userAnswers.filter(({ correct }) => correct);
    if (!correctAnswer.length) return;

    const headers = { 'Authorization': `${token}` }
    const newQuestions = correctAnswer.map(({ question_id }) => ({ type, question_id }));

    axios
      .put('http://localhost:5000/user', { newQuestions }, { headers })
      .catch((err) => new Error(err.message))
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
            ${active ? isCorrect ? 'right-quiz' : 'wrong-quiz' : '' }
            ${quizSelected === key ? 'quiz-selected' : ''}
          ` }
          onClick={ () => {
            handleAnswer(isCorrect, { question_id: key, answer: value, questions, correct: isCorrect });
            setQuizSelected(key);
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
            <Link to="/score">
              <button
                onClick={ finishGame }
              >
                Finalizar
              </button>
            </Link>
          ) : (
            <button
              onClick={() => {
                resetQuestions();
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