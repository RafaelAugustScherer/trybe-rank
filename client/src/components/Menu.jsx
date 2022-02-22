import { Link } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useContext, useState } from "react";
import { infoContext } from "../providers/InfoProvider";
import { gameContext } from "../providers/GameProvider";
import logo from '../img/trybe-icon.png';
import LeaveButton from "./logOff";
import ProfileCardHeader from "./ProfileCardHeader";
import '../css/menu.css';

const Menu = ({ path }) => {
  const [active, setActive] = useState(false);
  const { resetGame } = useContext(gameContext);
  const { userInfo } = useContext(infoContext);

  return (
    <>
      <div className="header">
        <div>
          <button 
            className="menu-button" 
            onClick={ () => setActive(!active) }
          >
            <AiOutlineMenu />
          </button>
          <img src={ logo } alt="logo-trybe" />
          <h2>TrybeRank</h2>
        </div>
        <ProfileCardHeader nickname={ userInfo.nickname } />
      </div>
      <div className={ `menu ${active ? 'menu-active' : ''}` }>
        <div className="menu-links">
          <Link to="/home">
            <button
              onClick={ resetGame }
              className={ `menu-link ${path === 'home' ? 'button-active-menu' : ''}` }
            >
              Home
            </button>
          </Link>
          <Link to="/select-quiz">
            <button
              onClick={ resetGame }
              className={ `menu-link ${path === 'quiz' ? 'button-active-menu' : ''}` }
            >
              Quizes
            </button>
          </Link>
          <Link to="/leaderboard">
            <button
              onClick={ resetGame }
              className={ `menu-link ${path === 'leaderboard' ? 'button-active-menu' : ''}` }
            >
              Leaderboard
            </button>
          </Link>
    
          <button className="menu-link" disabled>
            Comunidade
          </button>

        </div>
        <div className="leave-container">
          <div className="leave-info">
            <BsFillPeopleFill />
            { userInfo.nickname }
          </div>
          <LeaveButton />
        </div>
      </div>
    </>
  )
}

export default Menu;
