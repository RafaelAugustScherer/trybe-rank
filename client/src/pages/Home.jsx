import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTrophyFill, BsFillPeopleFill, BsFront } from 'react-icons/bs';
import { infoContext } from '../providers/InfoProvider';
import ProfileCard from '../components/profileCard';
import { fetchUsers } from '../utils/fetch/users';
import '../css/home-page.css';

const Home = () => {
  const navigate = useNavigate();
  const { token, userInfo, types, questions } = useContext(infoContext);
  const { nickname, completed_questions: completedQuestions } = userInfo;
  const [users, setUsers] = useState([]);

  const createQuestionsCards = () => {
    const cards = types.map(({ name, color }) => {
      const completedQuestionsByType = completedQuestions.filter(({ type }) => type === name).length;
      const totalQuestionsByType = questions.filter(({ type }) => type === name).length
      const progress = Math.round(completedQuestionsByType / totalQuestionsByType * 100);

      return (
        <div
          key={`${name}-question-card`}
          className="question-card"
        >
          <p style={{ color: `#${color}` }} >{name}</p>
          <p>{completedQuestionsByType}/{totalQuestionsByType}  {progress}%</p>
        </div>
      )
    });
    return cards;
  };

  const getUsers = async () => {
    const leaderboardUsers = await fetchUsers(token);
    setUsers(leaderboardUsers);
  }

  useEffect(() => {
    token && getUsers();
  }, [token]);

  const getPlayers = () => {
    const filterByQuizes = users.filter(({ completed_quizes: completedQuizes }) => completedQuizes.length);
    let userAndPoints = filterByQuizes.map(({ completed_quizes: completedQuizes, nickname }) => {
      const pontuation = completedQuizes.reduce((acc, curr) => acc + curr.score, 0);
      return { nickname, pontuation };
    });
    userAndPoints.sort(({ pontuation: a }, { pontuation: b }) => b - a);
    const userPosition = userAndPoints.findIndex(({ nickname: objNickname }) => objNickname === nickname);
    console.log(userAndPoints);
    const usersAround = userAndPoints.reduce((acc, cur, index) => {
      console.log(acc);
      if (acc.length === 10) return acc;
      if (index >= userPosition - 5) {
        return [...acc, cur];
      }
      return acc;
    }, []);

    return usersAround;
  }

  useEffect(() => {
    !!users.length && getPlayers();
  }, [users]);

  const renderLeaderboard = () => {
    const players = getPlayers();
    const rows = players.map(({ nickname, pontuation }, index) => (
      <tr key={ `jogador - ${nickname} / pontuacao - ${ pontuation }` }>
        <td>{ index + 1 + 'º' }</td>
        <td>{ nickname }</td>
        <td>{ pontuation }</td>
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Top</th>
            <th>Jogador</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    )
  }

  return (
    <div className="home-page">
      <h1 className="hero-title">Home</h1>
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
        {createQuestionsCards()}
      </section>
      <section key="leaderboard-section">
        <h2>Leaderboard</h2>
        <div className="leaderboard">
          { !!users.length && renderLeaderboard() }
        </div>
      </section>
    </div>
  );
}

export default Home;


