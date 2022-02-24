import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../utils/cookie";
import { infoContext } from "../providers/InfoProvider";
import { BiLogOut } from 'react-icons/bi';
import { useContext } from "react";


const LeaveButton = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(infoContext);


  const logOff = () => {
    setToken(null)
    deleteCookie();
    navigate('/');
  }

  return (
    <button
      className="menu-link leave"
      onClick={ logOff }
    >
      <BiLogOut />
      Sair
    </button>
  )
}

export default LeaveButton;
