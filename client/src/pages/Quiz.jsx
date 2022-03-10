import { useContext } from "react";
import { gameContext } from "../providers/GameProvider";
import QuizButton from '../components/quizButton';
import '../css/quiz-page.css';

const Quiz = () => {
  const { gameQuestions } = useContext(gameContext);
  const { score, gameIndex } = useContext(gameContext);

  const handleCodeFormatting = (text) => {
    const lineHandle = (line) => line.split('`').map((string, index) => index === 1 ? <code>{ string }</code> : <>{ string }</>);

    const blockHandle = text
      .split('```')
      .map((line, index) => (
        index === 1 ? <p><code>{ lineHandle(line) }</code></p> : <span>{ lineHandle(line) }</span>
      ));

    return typeof blockHandle === 'string' ? lineHandle(text) : blockHandle;
  }

  const renderQuiz = () => {
    const { question, correct_id, answers } = gameQuestions[gameIndex];
    return (
      <>
        <div className="quiz-question">
          <p>{ `${gameIndex + 1}º questão` }</p>
          <h2>{ handleCodeFormatting(question) }</h2>
          <p>{ `Pontos ${score}` }</p>
        </div>
        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center' }}>
          <QuizButton
            answers={ answers } 
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