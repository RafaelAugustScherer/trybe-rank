import { useContext } from "react";
import { gameContext } from "../providers/GameProvider";
import QuizButton from '../components/quizButton';
import '../css/quiz-page.css';

const Quiz = () => {
  const { gameQuestions } = useContext(gameContext);
  const { score, gameIndex } = useContext(gameContext);

  const renderQuiz = () => {
    const { question, correct_id, alternatives } = gameQuestions[gameIndex];
    return (
      <>
        <div className="quiz-question">
          <p>{ `${gameIndex + 1}º questão` }</p>
          <h2>{ question }</h2>
          <p>{ `Pontos ${score}` }</p>
        </div>
        <div>
          <QuizButton
            answers={ alternatives } 
            correctAnswer={ correct_id }
          />
        </div>
      </>
    )
  }

  return (
    <div className="quiz-page">
      { !!gameQuestions.length && renderQuiz() }
    </div>
  )
}

export default Quiz;