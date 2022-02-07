import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { infoContext } from '../providers/InfoProvider';
import { BsPersonCircle, BsPencilSquare } from 'react-icons/bs';

const ProfileCard = () => {
  const { token, userInfo, setUserInfo } = useContext(infoContext);
  const { username, nickname } = userInfo;
  const [usernameBkp, setUsernameBkp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!usernameBkp && username) {
      setUsernameBkp(username);
    }
  }, [username]);

  const onChange = ({ target: { id, value } }) => {
    setUserInfo({ ...userInfo, [id]: value });
  };

  const onEdit = async () => {
    setIsEditing(!isEditing);
    if (!isEditing) return;

    const headers = { Authorization: token };
    await axios
      .put('http://localhost:5000/user', {
        username_prev: usernameBkp,
        username,
        nickname
      }, { headers })
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
