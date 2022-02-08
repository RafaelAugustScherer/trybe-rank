import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTrophyFill, BsFillPeopleFill, BsFront } from 'react-icons/bs';
import { infoContext } from '../providers/InfoProvider';
import { fetchUsers } from '../utils/fetch/users';
import ProfileCard from '../components/profileCard';
import TypeCards from '../components/typeCards';
import Menu from '../components/Menu';
import { getPlayersAround, createTable } from '../utils/leaderboard';
import '../css/home-page.css';

const Home = () => {
  const navigate = useNavigate();
  const { token, userInfo } = useContext(infoContext);
  const { nickname } = userInfo;
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    const newPlayers = await getPlayersAround(token, nickname);
    setPlayers(newPlayers);
  };

  useEffect(() => {
    token && getPlayers();
  }, [token]);

  return (
    <div className="container-master">
      <Menu path="home"/>
      <div className="home-page">
        <section
          key="welcome-section"
          className="welcome"
        >
          <h2>Bem-vindo {nickname}!</h2>
          <ProfileCard />
        </section>
        <section
          key="quick-access-section"
          className="quick-access"
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
        <section key="quiz-progress-section">
          <h2>Progresso nos Quizes</h2>
          <TypeCards isMini />
        </section>
        <section key="leaderboard-section">
          <h2>Leaderboard</h2>
          <div className="leaderboard-home">
            <div className="leaderboard">
              { !!users.length && renderLeaderboard() }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;


