import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { infoContext } from '../providers/InfoProvider';
import { BsPersonCircle, BsPencilSquare, BsPlusLg } from 'react-icons/bs';
const SERVER_URL = process.env.REACT_APP_SERVER;

const ProfileCard = ({ score, rank }) => {
  const { token, userInfo, setUserInfo, questions } = useContext(infoContext);
  const { username, nickname, completed_questions: completedQuestions } = userInfo;
  const [usernameBkp, setUsernameBkp] = useState(null);
  const [hover, setHover] = useState({
    info: false,
    image: false,
  });
  const [editing ,setEditing] = useState({
    profile: false,
    image: false,
  });
  
  useEffect(() => {
    if (!usernameBkp && username) {
      setUsernameBkp(username);
    }
  }, [username]);

  const onChange = ({ target: { id, value } }) => {
    setUserInfo({ ...userInfo, [id]: value });
  };

  const onEdit = async () => {
    setEditing({...editing, profile: !editing.profile});
    if (!editing.profile) return;

    const headers = { Authorization: token };
    await axios
      .put(SERVER_URL + '/user', {
        username,
        nickname
      }, { headers })
      .catch((err) => new Error(err.message));
  };

  return (
    <div
      className="profile-div"
      onMouseEnter={ () => setHover({...hover, info: true}) }
      onMouseLeave={ () => setHover({...hover, info: false}) }
      >
      <div>
        <div
          onClick={ () => setEditing({ ...editing, image: !editing.image }) }
          onMouseEnter={ () => setHover({...hover, image: true}) }
          onMouseLeave={ () => setHover({...hover, image: false}) }
        >
        <BsPersonCircle
          className={ hover.image ? 'profile-image-blur' : 'profile-image' }
        />
        { hover.image && <BsPlusLg className="profile-image-add" /> }
        </div>
        <h3 className="nickname">{nickname}</h3>
        {
          editing.image && (
            <input
              type="url"
              id="image_url"
              className="profile-image-input"
              placeholder='URL da imagem'
              value={userInfo.image_url}
              onChange={onChange}
            />
          )
        }
      </div>
      <div className="profile-info-div">
      <div className="profile-div-edit">
        {editing.profile ? (
          <>
            <p>
              Nome:
              <input
                type="text"
                id="username"
                onChange={onChange}
                value={username}
                maxLength="10"
              ></input>
            </p>
            <p>
              Apelido:
              <input
                type="text"
                id="nickname"
                onChange={onChange}
                value={nickname}
                maxLength="10"
              ></input>
            </p>
          </>
        ) : (
          <>
            <p>Nome: <span>{username}</span></p>
            <p>Apelido: <span>{nickname}</span></p>
          </>
        )}
        <BsPencilSquare onClick={onEdit} className={ hover.info ? 'show' : '' } />
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
