import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTrophyFill, BsFillPeopleFill, BsFront } from 'react-icons/bs';
import { infoContext } from '../providers/InfoProvider';
import { getPlayersAround, createTable } from '../utils/leaderboard';
import Menu from '../components/Menu';
import ProfileCard from '../components/profileCard';
import TypeCards from '../components/typeCards';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import '../css/home-page.css';

const Home = () => {
  const navigate = useNavigate();
  const { token, userInfo } = useContext(infoContext);
  const { nickname } = userInfo;
  const [players, setPlayers] = useState([]);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);

  const getPlayers = async () => {
    const newPlayers = await getPlayersAround(token, nickname);
    setPlayers(newPlayers);
  };

  const getRank = () => {
    const thisPlayer = players.find(({nickname: ply3rNickname}) => ply3rNickname === nickname);
    
    if (thisPlayer) {
      const newRank = players.indexOf(thisPlayer) + 1;

      setScore(thisPlayer.score);
      setRank(newRank);
    } else {
      setPlayers([...players, { nickname, score }]);
      setRank(players.length);
    }
  }

  useEffect(() => {
    token && getPlayers();
  }, [nickname, token]);

  useEffect(() => {
    getRank();
  }, [players]);

  const renderPage = () => (
    <>
      <Menu path="home"/>
      <div className="home-page">
        <section
          key="welcome-section"
          className="home-section welcome"
        >
          <h2>Bem-vindo {nickname}!</h2>
          <ProfileCard score={ score } rank={ rank !== 0 ? rank : '' } />
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
          <div className="leaderboard-container">
            <div className="leaderboard">
              { !!players.length && createTable(players) }
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      { !nickname ? <Loading /> : renderPage() }
    </>
  );
}

export default Home;


