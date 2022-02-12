import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { infoContext } from '../providers/InfoProvider';
import { BsPersonCircle, BsPencilSquare } from 'react-icons/bs';

const ProfileCard = ({ score, rank }) => {
  const { token, userInfo, setUserInfo, questions } = useContext(infoContext);
  const { username, nickname, completed_questions: completedQuestions } = userInfo;
  const [usernameBkp, setUsernameBkp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(false);

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
    <div
      className="profile-div"
      onMouseEnter={ () => setHoverInfo(true) }
      onMouseLeave={ () => setHoverInfo(false) }
    >
      <div>
        <BsPersonCircle className="profile-image" />
        <h3 className="nickname">{nickname}</h3>
      </div>
      <div className="profile-info-div">
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
            <p>Nome: <span>{username}</span></p>
            <p>Apelido: <span>{nickname}</span></p>
          </>
        )}
        <BsPencilSquare onClick={onEdit} className={ hoverInfo ? 'show' : '' } />
      </div>
      <div className="ranking-div">
          <p>Pontuação: <span>{ score }</span></p>
          <p>Exercícios: <span>{completedQuestions.length}/{questions.length}</span></p>
          <p>Rank: <span>{rank}º</span></p>
      </div>
      </div>
    </div>
  );
};

export default ProfileCard;
