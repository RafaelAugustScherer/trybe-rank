import { useContext, useEffect, useState } from "react";
import { gameContext } from "../providers/GameProvider";
import { infoContext } from "../providers/InfoProvider";
import axios from 'axios';
import { Link } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER;

const QuizButton = ({ answers, correctAnswer }) => {
  const [questions, setQuestions] = useState([]);
  const [quizSelected, setQuizSelected] = useState(null);
  const { token, userInfo, setUserInfo } = useContext(infoContext)
  const {
    type,
    difficulty,
    score,
    gameIndex,
    gameQuestions,
    setGameIndex,
    userAnswers,
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

  const updateQuestions = (questions, quiz) => {
    const { completed_questions, completed_quizes } = userInfo;

    const newQuestions = questions.reduce((acc, cur) => {
      const questionIsDifferent = completed_questions
        .every(({ question_id }) => question_id !== cur.question_id);
      
      if (questionIsDifferent) {
        return [...acc, cur];
      }
      return acc;
    }, completed_questions);

    const quizCompletedIndex = completed_quizes
      .findIndex(({ type, difficulty }) => type === quiz.type && difficulty === quiz.difficulty);

    let newQuizes = [...completed_quizes];
    if (quizCompletedIndex !== -1) {
      newQuizes[quizCompletedIndex] = quiz;
    } else {
      newQuizes.push(quiz);
    }

    setUserInfo({
      ...userInfo,
      completed_questions: newQuestions,
      completed_quizes: newQuizes
    });

    const headers = { Authorization: token }
    axios
      .patch(SERVER_URL + '/user', { newQuestions: questions, newQuiz: quiz }, { headers })
      .catch((err) => new Error(err.message));
  }

  const finishGame = () => {
    const correctAnswer = userAnswers.filter(({ correct }) => correct);
    if (!correctAnswer.length) return;
  
    const newQuestions = correctAnswer.map(({ question_id }) => ({ type, question_id }));
    const newQuiz = { type, score, difficulty }

    updateQuestions(newQuestions, newQuiz);
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
      <div className="next-prev-buttons">
        {
          gameIndex > 0 && (
            <button
              style={ {'backgroundColor': '#b1b1b1', 'display': `${active ? 'block': 'none'}`} }
              disabled={ !active }
              className="wrong-quiz"
              onClick={() => {
                prevPage();
              }}
            >
              Voltar
            </button>
          )
        }
        { last ? (
          <Link to="/score">
            <button
              style={ {'display': `${active ? 'block': 'none'}` } }
              disabled={ !active }
              className="right-quiz"
              onClick={ finishGame }
            >
              Finalizar
            </button>
          </Link>
        ) : (
          <button
            disabled={ !active }
            style={ {'display': `${active ? 'block': 'none'}` } }
            className="right-quiz"
            onClick={() => {
              resetQuestions();
              nextPage();
            }}
          >
            Avançar
          </button>
        ) }
      </div>
    </>
  )
}

export default QuizButton