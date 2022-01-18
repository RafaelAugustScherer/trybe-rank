import { useContext } from "react"
import { gameContext } from "../providers/GameProvider"

const SelectDificulty = () => {
  const { setDificulty, dificulty } = useContext(gameContext)

  return (
    <div
      className="select-dificulty"
    >
      <button
        onClick={ () => setDificulty(1) }
        className={ `dificulty-button ${dificulty === 1 ? 'dificulty-selected' : ''}` }
      >
        Iniciante
      </button>
      <button
        onClick={ () => setDificulty(2) }
        className={ `dificulty-button ${dificulty === 2 ? 'dificulty-selected' : ''}` }
      >
        Intermediario
      </button>
      <button
        onClick={ () => setDificulty(3) }
        className={ `dificulty-button ${dificulty === 3 ? 'dificulty-selected' : ''}` }
      >
        Dificil
      </button>
    </div>
  )
}

export default SelectDificulty;
