import React, { useContext, useEffect, useState } from 'react';
import { infoContext } from '../providers/InfoProvider';
import { BsPersonCircle, BsPencilSquare, BsTrophyFill, BsFillPeopleFill, BsFront } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import '../css/home-page.css';

const Home = () => {
  const navigate = useNavigate();
  const { username, nickname, types, questions, completedQuestions } = useContext(infoContext);

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

  return (
      <div className="home-page">
        <h1 className="hero-title">Home</h1>
        <section
          key="welcome-section"
          className="welcome"
        >
          <h2>Bem-vindo {nickname}!</h2>
          <div className="profile-div">
            <div>
              <BsPersonCircle className="profile-image" />
              <p>{ nickname }</p>
            </div>
            <div className="profile-div-edit">
              <p>Nome: <span>{ username }</span></p>
              <p>Apelido: <span>{ nickname }</span></p>
              <BsPencilSquare />
            </div>
          </div>
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
          <button disabled>
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
        <section
          key="leaderboard-section"
          className="leaderboard">
          <h2>Leaderboard</h2>
          <p>Leaderboard aqui.</p>
        </section>
      </div>
    );
}

export default Home;

