import { useContext } from "react";
import { gameContext } from "../providers/GameProvider";
import QuizButton from '../components/quizButton';
import '../css/quiz-page.css';

const Quiz = () => {
  const { gameQuestions } = useContext(gameContext);
  const { pontos, gameIndex } = useContext(gameContext);

  const renderQuiz = () => {
    const { pergunta, id_correta, alternativas } = gameQuestions[gameIndex];
    return (
      <>
        <div className="quiz-question">
          <p>{ `${gameIndex + 1}º questão` }</p>
          <h2>{ pergunta }</h2>
          <p>{ `Pontos ${pontos}` }</p>
        </div>
        <div>
          <QuizButton
            answers={ alternativas } 
            correctAnswer={ id_correta }
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