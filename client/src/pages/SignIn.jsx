import trybeIcon from '../svg/trybeIcon.svg';
import Style from '../css/Login.module.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { infoContext } from '../providers/InfoProvider';

function SignIn() {
  const navigate = useNavigate();
  const { setNickname } = useContext(infoContext);
  const [state, setState] = useState({ nickname: '', password: '' });
  const [error, setError] = useState(null);

  const onChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };

  const onLogin = async () => {
    const { nickname, password } = state;
    const auth = await axios.get('http://localhost:5000/sign-in', 
      { headers: {
        nickname,
        password
      } }
    ).then(res => res.data)
    .then(({ status }) => status === 200);
    
    if (auth) {
      setNickname(nickname);
      navigate('/select-quiz');
    } else {
      setError('Usuário não encontrado!');
    }
  }

  return (
    <div className={ Style.page }>
      <div className={ Style.container }> 
        <div className={ Style.imgContainer }>
          <h1>Trybe Rank</h1>
          <img src={trybeIcon} alt="icone" />
        </div>
        { error && <p>{ error }</p> }
        <div className={ Style.inputContainer }>
          <input
            id="nickname"
            type="text"
            className={ Style.loginInput }
            placeholder="Apelido"
            onChange={ onChange }
          />
          <input
            id="password"
            type="password"
            className={ Style.loginInput }
            placeholder="Senha"
            onChange={ onChange }
          />
        </div>
        <button 
          className={ Style.signInBot }
          type="button" 
          onClick={ onLogin }
        >
          Entrar
        </button>
        <Link to="/select-quiz">
          <p
            onClick={() => setNickname('Convidado')}
          >
            Entrar como convidado
          </p>
        </Link>
        <Link to="/sign-up">
          <p>Criar uma conta</p>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;