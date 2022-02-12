import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = ({ active, completed, total }) => {
  const [percentage, setPercentage] = useState(0);

  const getPercentage = () => {
    const value = (completed * 100) / total;
    return value ? Math.round(value) : 0;
  };

  const showPercentage = () => {
    setTimeout(() => {
      const total = getPercentage();
      setPercentage(total);
    }, 500)
  }

  useEffect(() => {
    showPercentage();
  }, [completed, total]);
  
  return (
    <div className="progress">
      <CircularProgressbar
        value={ percentage }
        text={ `${percentage}%` }
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