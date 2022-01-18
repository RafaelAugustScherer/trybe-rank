import { useContext } from "react";
import { gameContext } from "../providers/GameProvider";

const Quiz = () => {
  const { gameIndex, gameQuestions } = useContext(gameContext);

  const renderQuiz = () => {
    const { pergunta, id_correto, type_id, alternativas } = gameQuestions[gameIndex];
    const correct_answer = alternativas[id_correto];
    const wrong_anwers = Object
      .values(alternativas)
      .filter((answer) => answer !== correct_answer);
    return (
      <div>
        <div>
          <h2>{ pergunta }</h2>
        </div>
      </div>
    )
  }

  return (
    <>
      { !!gameQuestions.length && renderQuiz() }
    </>
  )
}

export default Quiz;