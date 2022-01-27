import { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from '../css/Login.module.css';
import axios from 'axios';

const SignUp = () => {
  const [apelido, setApelido] = useState('');
  const [isSenhaActive, setSenhaActive] = useState(false);
  const [senha, setSenha] = useState('');
  const [segundaSenha, setSegundaSenha] = useState('');

  const CreateUser = () => {
    const newUser = { apelido, senha };
    axios.post('http://localhost:5000/user', newUser)
  }

  const regexApelido = /[\w]/i
  const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/gm

  let disabled = false;
  if ([apelido, senha, segundaSenha].includes('')) disabled = true;
  if (!regexApelido.test(apelido)) disabled = true;
  if (!regexSenha.test(senha)) disabled = true;
  if (senha !== segundaSenha) disabled = true;


  return (
    <div className={ Style.page } >
      <form className={ Style.container }>
        <h1 className="hero-title">Sign Up</h1>
        <label htmlFor='apelido-id'>
          Apelido:
          <input
            className={ Style.loginInput }
            placeholder='Apelido'
            id='apelido-id'
            type="text"
            onChange={ ({ target: { value } }) => setApelido(value) }
            value={ apelido }
          />
        </label>
        <label htmlFor='senha-id'>
          Senha:
          <input
            onFocus={ () => setSenhaActive(true) }
            onBlur={ () => setSenhaActive(false) }
            className={ Style.loginInput }
            placeholder='Senha'
            id='senha-id'
            type="password"
            onChange={ ({ target: { value } }) => setSenha(value) }
            value={ senha }
          />
        </label>
        <label htmlFor='segundaSenha-id'>
          Digite novamente a senha:
          <input
            onFocus={ () => setSenhaActive(true) }
            onBlur={ () => setSenhaActive(false) }
            className={ Style.loginInput }
            placeholder='Digite novamente a senha'
            id='segundaSenha-id'
            type="password"
            onChange={ ({ target: { value } }) => setSegundaSenha(value) }
            value={ segundaSenha }
          />
        </label>
        <div 
          style={ { 'display': `${isSenhaActive ? 'block' : 'none'}` } }
          className={ Style.senhaOptions }
        >
          <p>Senha com pelomenos:</p>
          <ul>
            <li>1 Maiúscula</li>
            <li>1 Minúscula</li>
            <li>1 Numero</li>
            <li>Tamanho de 8 caracteres</li>
          </ul>
        </div>
        <Link to="/">
          <button
            type="button"
            onClick={ CreateUser }
            className={ Style.signInBot }
            disabled={ disabled }
          >
            Sign Up
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;