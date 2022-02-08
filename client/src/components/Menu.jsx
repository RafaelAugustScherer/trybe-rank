import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsTrophyFill, BsFillPeopleFill, BsFront,  } from 'react-icons/bs';
import { deleteCookie } from "../utils/cookie";
import { useContext } from "react";
import { infoContext } from "../providers/InfoProvider";
import '../css/menu.css';

const Menu = ({ path }) => {
  const { setToken } = useContext(infoContext)
  const navigate = useNavigate();

  const logOff = () => {
    setToken("")
    deleteCookie();
    navigate('/');
  }

  return (
    <div className="menu">
      <div className="logo-container">
        <h2>TrybeRank</h2>
      </div>
      <div className="menu-links">
        <Link to="/home">
          <button className={ `menu-link ${path === 'home' ? 'button-active-menu' : ''}` }>
            <AiFillHome />
            Home
          </button>
        </Link>
        <Link to="/select-quiz">
          <button className={ `menu-link ${path === 'quiz' ? 'button-active-menu' : ''}` }>
            <BsFront />
            Quizes
          </button>
        </Link>
        <Link to="/leaderboard">
          <button className={ `menu-link ${path === 'leaderboard' ? 'button-active-menu' : ''}` }>
            <BsTrophyFill />
            Leaderboard
          </button>
        </Link>
   
        <button className="menu-link" disabled>
          <BsFillPeopleFill />
          Comunidade
        </button>

      </div>
      <div className="leave-container">
        <button
          className="menu-link leave"
          onClick={ logOff }
        >
          <BiLogOut />
          Sair
        </button>
      </div>
    </div>
  )
}

export default Menu;
