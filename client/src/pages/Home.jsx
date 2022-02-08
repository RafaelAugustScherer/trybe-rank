import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTrophyFill, BsFillPeopleFill, BsFront } from 'react-icons/bs';
import { infoContext } from '../providers/InfoProvider';
import { getPlayersAround, createTable } from '../utils/leaderboard';
import Menu from '../components/Menu';
import ProfileCard from '../components/profileCard';
import TypeCards from '../components/typeCards';
import '../css/home-page.css';

const Home = () => {
  const navigate = useNavigate();
  const { token, userInfo } = useContext(infoContext);
  const { nickname } = userInfo;
  const [players, setPlayers] = useState([]);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(1);

  const getPlayers = async () => {
    const newPlayers = await getPlayersAround(token, nickname);
    setPlayers(newPlayers);

    const thisPlayer = newPlayers.find(({nickname: ply3rNickname}) => ply3rNickname === nickname);
    if (thisPlayer) {
      const newRank = newPlayers.indexOf(thisPlayer) + 1;
      console.log(thisPlayer.score, newRank);
      setScore(thisPlayer.score);
      setRank(newRank);
    } 
  };

  useEffect(() => {
    token && getPlayers();
  }, [nickname, token]);

  return (
    <div className="container-master">
      <Menu path="home" />
      <div className="home-page">
        <h1 className="hero-title">Home</h1>
        <section
          key="welcome-section"
          className="welcome home-section"
        >
          <h2>Bem-vindo {nickname}!</h2>
          <ProfileCard score={ score } rank={ rank } />
        </section>
        <section
          key="quick-access-section"
          className="home-section quick-access"
        >
          <h2>Acesso Rápido</h2>
          <button onClick={() => navigate('/select-quiz')}>
            <BsFront />
            <p>Quizes</p>
          </button>
          <button onClick={() => navigate('/leaderboard') }>
            <BsTrophyFill />
            <p>Leaderboard</p>
          </button>
          <button disabled>
            <BsFillPeopleFill />
            <p>Comunidade</p>
          </button>
        </section>
        <section
          key="quiz-progress-section"
          className="home-section">
          <h2>Progresso nos Quizes</h2>
          <TypeCards isMini />
        </section>
        <section
          key="leaderboard-section"
          className="home-section">
          <h2>Leaderboard</h2>
          <div className="leaderboard">
            { !!players.length && createTable(players) }
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;


