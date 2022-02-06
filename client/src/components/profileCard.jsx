import React, { useState, useContext } from 'react';
import axios from 'axios';
import { infoContext } from '../providers/InfoProvider';
import { BsPersonCircle, BsPencilSquare } from 'react-icons/bs';

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo, setUserInfo } = useContext(infoContext);
  const { token, username, nickname } = userInfo;

  const onChange = ({ target: { id, value } }) => {
    setUserInfo({ ...userInfo, [id]: value });
  };

  const onEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setIsEditing(false);
    const headers = { Authorization: `${token}` };
    axios
      .put('http:://localhost:5000/user', { username, nickname }, { headers })
      .catch((err) => new Error(err.message));
  };

  return (
    <div className="profile-div">
      <div>
        <BsPersonCircle className="profile-image" />
        <p>{nickname}</p>
      </div>
      <div className="profile-div-edit">
        {isEditing ? (
          <>
            <p>
              Nome:
              <input
                type="text"
                id="username"
                onChange={(e) => onChange(e)}
                value={username}
              ></input>
            </p>
            <p>
              Apelido:
              <input
                type="text"
                id="nickname"
                onChange={onChange}
                value={nickname}
              ></input>
            </p>
          </>
        ) : (
          <>
            <p>
              Nome: <span>{username}</span>
            </p>
            <p>
              Apelido: <span>{nickname}</span>
            </p>
          </>
        )}
        <BsPencilSquare onClick={onEdit} />
      </div>
    </div>
  );
};

export default ProfileCard;
