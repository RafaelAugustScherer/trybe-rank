import { useContext } from "react"
import { gameContext } from "../providers/GameProvider"

const DifficultyButton = ({ color, title }) => {
  const { setDificuldade, dificuldade } = useContext(gameContext);

  return (
    <button
      style={ dificuldade === title ? { 'color': color, 'borderColor': color } : {} }
      onClick={ () => setDificuldade(title) }
      className={ 'dificulty-button' }
    >
      { title }
    </button>
  )
}

export default DifficultyButton;
