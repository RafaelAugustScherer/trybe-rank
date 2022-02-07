import { useContext } from 'react';
import { gameContext } from '../providers/GameProvider';
import { Link } from 'react-router-dom';
import ScoreCard from '../components/scoreCard';
import '../css/score-page.css';

const Score = () => {
  const { resetGame } = useContext(gameContext);

  return (
    <div className='quiz-page'>
      <h1 className='hero-title'>Pontuação</h1>
      <ScoreCard />
      <div className="next-prev-buttons">
        <Link to="/select-quiz">
          <button
            className="voltar-menu"
            onClick={ () => resetGame() }
          >
            Voltar para o menu
          </button>
        </Link>
        <Link to="/leaderboard">
          <button
            className="right-quiz"
            onClick={ () => resetGame() }
          >
            Leaderboard
          </button>
        </Link>
      </div>
    </div>
  )
};

export default Score;
