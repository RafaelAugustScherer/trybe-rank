import { useContext } from "react";
import { gameContext } from "../providers/GameProvider";
import QuizButton from '../components/quizButton';
import '../css/quiz-page.css';

const Quiz = () => {
  const { pontos, gameIndex, gameQuestions } = useContext(gameContext);

  const renderQuiz = () => {
    const { pergunta, id_correto, alternativas } = gameQuestions[gameIndex];
    return (
      <>
        <div className="quiz-question">
          <p>{ `${gameIndex + 1}º questão` }</p>
          <h2>{ pergunta }</h2>
          <p>{ `Pontos ${pontos}` }</p>
        </div>
        <QuizButton
          answers={ alternativas } 
          correctAnswer={ id_correto }
        />
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