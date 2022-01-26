import trybeIcon from '../svg/trybeIcon.svg';
import Style from '../css/Login.module.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infoContext } from '../providers/InfoProvider';

function Login() {
  const navigate = useNavigate();
  const { setApelido } = useContext(infoContext);
  const [state, setState] = useState({ apelido: '', senha: '' });
  const [error, setError] = useState(null);

  const onChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };

  const onLogin = async () => {
    const { apelido, senha } = state;
    const auth = await axios.get('http://localhost:5000/login', 
      { headers: {
        apelido,
        senha
      } }
    ).then(res => res.data)
    .then(({ message }) => message === 'OK');
    
    if (auth) {
      setApelido(apelido);
      navigate('/select-quiz');
    } else {
      setError('Usuário não encontrado!');
    }
  }

  return (
    <div className={Style.page}>
      <div className={ Style.container}>
        <div className={ Style.imgContainer}>
        <h1>Trybe Rank</h1>
        <img src={trybeIcon} alt="" />
        </div>
        { error && <p>{ error }</p> }
        <input
          id="apelido"
          type="text"
          placeholder="Apelido"
          onChange={ onChange }
        />
        <input
          id="senha"
          type="password"
          placeholder="Senha"
          onChange={ onChange }
        />
        <button type="button" onClick={ onLogin }>Entrar</button>
        <p>Entrar como convidado</p>
      </div>
    </div>
  );
}

export default Login;