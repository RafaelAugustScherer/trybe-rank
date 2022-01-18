import { useContext } from "react"
import { gameContext } from "../providers/GameProvider"

const DifficultyButton = ({ id, color, title }) => {
  const { setDificulty, dificulty } = useContext(gameContext)

  return (
    <button
      style={ dificulty === id ? { 'color': color, 'borderColor': color } : {} }
      onClick={ () => setDificulty(id) }
      className={ 'dificulty-button' }
    >
      { title }
    </button>
  )
}

export default DifficultyButton;
