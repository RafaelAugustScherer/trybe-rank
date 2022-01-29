import trybeIcon from '../svg/trybeIcon.svg';
import Style from '../css/Login.module.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { infoContext } from '../providers/InfoProvider';

function SignIn() {
  const navigate = useNavigate();
  const { setApelido } = useContext(infoContext);
  const [state, setState] = useState({ apelido: '', senha: '' });
  const [error, setError] = useState(null);

  const onChange = ({ target: { id, value } }) => {
    setState({ ...state, [id]: value });
  };

  const onLogin = async () => {
    const { apelido, senha } = state;
    const auth = await axios.get('http://localhost:5000/sign-in', 
      { headers: {
        apelido,
        senha
      } }
    ).then(res => res.data)
    .then(({ status }) => status === 200);
    
    if (auth) {
      setApelido(apelido);
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
            id="apelido"
            type="text"
            className={ Style.loginInput }
            placeholder="Apelido"
            onChange={ onChange }
          />
          <input
            id="senha"
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
            onClick={() => setApelido('Convidado')}
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