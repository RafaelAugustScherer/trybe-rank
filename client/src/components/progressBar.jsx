import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';


const ProgressBar = ({ active, completed, quantity, id }) => {
  const [percentage, setPercentage] = useState(0);

  const getPercentage = () => {
    const value = (completed * 100) / quantity;
    return Math.round(value);
  }

  const showPercentage = () => {
    setTimeout(() => {
      const total = getPercentage();
      for(let i = 0; i <= total; i += 1) {
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