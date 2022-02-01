import { useContext } from 'react';
import { gameContext } from '../providers/GameProvider';
import { Link } from 'react-router-dom';
import ScoreCard from '../components/scoreCard';
import '../css/score-page.css';

const Score = () => {
  const {
    score,
    hits,
    bestStreak: streak,
    resetGame
  } = useContext(gameContext);
  const scoreCardInfo = { score, hits, streak };

  return (
    <div className='quiz-page'>
      <h1 className='hero-title'>Pontuação</h1>
      <ScoreCard { ...scoreCardInfo } />
      <div>
        <Link to="/select-quiz">
          <button
            onClick={ () => resetGame() }
          >
            Voltar para o menu
          </button>
        </Link>
      </div>
    </div>
  )
};

export default Score;
