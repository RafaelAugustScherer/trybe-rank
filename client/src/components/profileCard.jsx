import React, { useState, useContext, useEffect } from 'react';
import { infoContext } from '../providers/InfoProvider';
import { BsPersonCircle, BsPencilSquare, BsPlusLg } from 'react-icons/bs';

const ProfileCard = ({ score, rank }) => {
  const [cardUserInfo, setCardUserInfo] = useState({});
  const [error, setError] = useState(undefined);

  const {
    userInfo,
    questions,
    updateUser
  } = useContext(infoContext);
  
  const {
    completed_questions: completedQuestions,
    image_url: imageUrl,
    is_guest: isGuest
  } = userInfo;
  

  useEffect(() => {
    const { nickname, image_url } = userInfo;
    setCardUserInfo({ nickname, image_url });
  }, [userInfo]);

  useEffect(() => {
    error && setTimeout(() => {
      setError(undefined);
    }, 5000);
  }, [error]);

  const [ hover, setHover ] = useState({
    info: false,
    image: false,
  });
  const [ editing, setEditing ] = useState({
    profile: false,
    image: false,
  });

  const onChange = ({ target: { id, value } }) => {
    setCardUserInfo({ ...cardUserInfo, [ id ]: value });
  };

  const onEdit = async () => {
    const { profile: editingProfile } = editing;
    const { nickname, image_url } = cardUserInfo;
    if (nickname === '') {
      setError('Nickname não pode estar vazio');
      return;
    }
    if (editingProfile && nickname !== userInfo.nickname) {
      const error = await updateUser({ nickname, image_url });
      if (error) {
        setError(error);
        return;
      }
    }
    setEditing({ profile: !editingProfile, image: false });
  };

  return (
    <div
      className="profile-div"
      onMouseEnter={() => !isGuest && setHover({ ...hover, info: true })}
      onMouseLeave={() => setHover({ ...hover, info: false })}
    >
      <div>
        <div
          onClick={() => editing.profile && setEditing({ ...editing, image: !editing.image })}
          onMouseEnter={() => setHover({ ...hover, image: true })}
          onMouseLeave={() => setHover({ ...hover, image: false })}
        >
          {
            imageUrl ? (
              <img
                src={imageUrl}
                alt="profile"
                className={`profile-image ${hover.image && editing.profile ? 'blur' : ''}`}
              />
            ) : (
              <BsPersonCircle
                className={`profile-image ${hover.image && editing.profile ? 'blur' : ''}`}
              />
            )
          }
          {hover.image && editing.profile && <BsPlusLg className="profile-image-add" />}
        </div>
        <h3 className="nickname">{cardUserInfo.nickname}</h3>
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
          <p>Nome: <span>{userInfo.username}</span></p>
          {editing.profile ? (
            <p>
              Apelido:
              <input
                type="text"
                id="nickname"
                onChange={onChange}
                value={cardUserInfo.nickname}
                maxLength="10"
              ></input>
            </p>
          ) : (
            <p>Apelido: <span>{userInfo.nickname}</span></p>
          )}
          <BsPencilSquare onClick={onEdit} className={hover.info ? 'show' : ''} />
        </div>
        <div className="ranking-div">
          <p>Pontuação: <span>{score}</span></p>
          <p>Exercícios: <span>{completedQuestions.length}/{questions.length}</span></p>
          <p>Rank: <span>{rank}º</span></p>
        </div>
      </div>
      {
        error && (
          <p className="profile-div-error">Erro: { error }</p>
        )
      }
    </div>
  );
};

export default ProfileCard;
