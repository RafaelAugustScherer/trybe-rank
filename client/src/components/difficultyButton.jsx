import { useContext } from "react"
import { gameContext } from "../providers/GameProvider"

const DifficultyButton = ({ color, title }) => {
  const { setDifficulty, difficulty } = useContext(gameContext);

  return (
    <button
      style={ difficulty === title ? { 'color': color, 'borderColor': color } : {} }
      onClick={ () => setDifficulty(title) }
      className={ 'dificulty-button' }
    >
      { title }
    </button>
  )
}

export default DifficultyButton;
