import DifficultyButton from "./difficultyButton";

const SelectDifficulty = ({ color }) => {
  const hexColor = `#${color}`

  const renderButtons = () => {
    const titles = ['Iniciante', 'Intermediario', 'Dificil'];
    const buttons = titles.map((title, index) => (
      <DifficultyButton 
        key={ `difficulty - ${index}` }
        color={ hexColor } 
        title={ title } 
      />
    ));
    return buttons;
  }

  return (
    <div
      className="select-difficulty"
    >
      { renderButtons() }
    </div>
  )
}

export default SelectDifficulty;
