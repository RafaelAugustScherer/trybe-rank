import React, { useState, useContext } from 'react';
import { infoContext } from '../providers/InfoProvider';
import { BsPersonCircle, BsPencilSquare, BsPlusLg } from 'react-icons/bs';

const ProfileCard = ({ score, rank }) => {
  const { userInfo, setUserInfo, questions, updateUser } = useContext(infoContext);
  const {
    username,
    nickname,
    completed_questions: completedQuestions,
    image_url: imageUrl,
    is_guest: isGuest
  } = userInfo;
  const [hover, setHover] = useState({
    info: false,
    image: false,
  });
  const [editing ,setEditing] = useState({
    profile: false,
    image: false,
  });

  const onChange = ({ target: { id, value } }) => {
    setUserInfo({ ...userInfo, [id]: value });
  };

  const onEdit = async () => {
    const { profile: editingProfile } = editing;
    setEditing({profile: !editingProfile, image: false });
    editingProfile && updateUser();
  };

  return (
    <div
      className="profile-div"
      onMouseEnter={ () => !isGuest && setHover({...hover, info: true}) }
      onMouseLeave={ () => setHover({...hover, info: false}) }
      >
      <div>
        <div
          onClick={ () => editing.profile && setEditing({ ...editing, image: !editing.image }) }
          onMouseEnter={ () => setHover({...hover, image: true}) }
          onMouseLeave={ () => setHover({...hover, image: false}) }
        >
          {
            imageUrl ? (
              <img
                src={ imageUrl }
                alt="profile"
                className={ `profile-image ${hover.image && editing.profile ? 'blur' : ''}` }
              />
            ) : (
              <BsPersonCircle
                className={ `profile-image ${hover.image && editing.profile ? 'blur' : ''}` }
              />
            )
          }
        { hover.image && editing.profile && <BsPlusLg className="profile-image-add" /> }
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
