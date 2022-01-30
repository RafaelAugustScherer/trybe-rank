import DifficultyButton from "./difficultyButton";

const SelectDificulty = ({ color }) => {
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
      className="select-dificulty"
    >
      { renderButtons() }
    </div>
  )
}

export default SelectDificulty;
