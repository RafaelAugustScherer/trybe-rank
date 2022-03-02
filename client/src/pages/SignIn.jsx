import trybeIcon from '../img/trybeIcon.svg';
import Style from '../css/Login.module.css';
import axios from 'axios';
import Footer from '../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { infoContext } from '../providers/InfoProvider';
import { setCookie } from '../utils/cookie';

function SignIn() {
  const navigate = useNavigate();
  const { token, setToken, getToken } = useContext(infoContext);
  const [state, setState] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const onChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };


  const onLogin = () => {
    const { username, password } = state;
    axios.get('http://localhost:5000/user/auth', 
      { headers: {
        username,
        password
      } }
    )
      .then(res => res.data)
      .then(({ token }) => {
        setCookie('token', token, 24);
        getToken();
        navigate('/home');
      })
      .catch(() => {
        setError('Usuário ou senha incorreto!');
      })
  }

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  return (
    <>
    <div className={ Style.page }>
      <div className={ Style.container }> 
        <div className={ Style.imgContainer }>
          <h1>Trybe Rank</h1>
          <img src={trybeIcon} alt="icone" />
        </div>
        { error && <p>{ error }</p> }
        <div className={ Style.inputContainer }>
          <input
            id="username"
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
            onClick={() => {
              setToken('guest');
            } }
          >
            Entrar como convidado
          </p>
        </Link>
        <Link to="/sign-up">
          <p>Criar uma conta</p>
        </Link>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default SignIn;