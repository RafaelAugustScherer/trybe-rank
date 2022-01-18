import { questions_completed } from '../data/gameData';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';


const ProgressBar = ({ active, quantity, id }) => {
  const [percentage, setPercentage] = useState(0);

  const getPercentage = () => {
    const questions = questions_completed.filter(({ type_id }) => type_id === id).length;
    const value = (questions * 100) / quantity;
    return questions ? Math.floor(value) : 0;
  }

  const showPercentage = () => {
    setTimeout(() => {
      const total = getPercentage();
      for(let i = 0; i < total; i += 1) {
        setPercentage(i)
      }
    }, 500)
  }

  useEffect(() => {
    showPercentage();
  }, [])
  
  return (
    <div className="progress">
      <CircularProgressbar
        value={ percentage }
        text={ percentage + '%' }
        styles={buildStyles({
          textColor: `${active ? 'white' : 'transparent'}`,
          pathColor: '#61c9a3',
          trailColor: '#292929',
        })} 
      />
    </div>
  );
};

export default ProgressBar;