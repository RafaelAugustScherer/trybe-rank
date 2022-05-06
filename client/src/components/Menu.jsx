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

  const { nickname, image_url: imageUrl } = userInfo;

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
        </div>
          <Link to="/home" className="header-title-link">
            <img src={ logo } className="header-logo" alt="logo-trybe" />
            <h2 className="header-title">TrybeRank</h2>
          </Link>
        <ProfileCardHeader nickname={ nickname } imageUrl={ imageUrl } />
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
            { nickname }
          </div>
          <LeaveButton />
        </div>
      </div>
    </>
  )
}

export default Menu;
