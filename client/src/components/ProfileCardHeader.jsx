import { useState } from "react"
import { BsPersonCircle } from 'react-icons/bs'
import LeaveButton from "./logOff";

const ProfileCardHeader = ({ nickname, imageUrl }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="profileCardHeader">
      <button
        type="button"
        onClick={ () => setActive(!active) }
      >
        {
          imageUrl ? (
            <img src={ imageUrl } alt="profile-header" />
          ) : (
            <BsPersonCircle />
          )
        }
        <p>{ nickname }</p>
      </button>
      { active && (
        <div className="leave-card-header">
          <LeaveButton />
        </div>
      ) }
    </div>
  )
}

export default ProfileCardHeader;