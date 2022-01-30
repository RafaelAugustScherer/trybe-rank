import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Style from '../css/Login.module.css';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isPasswordActive, setPasswordActive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const CreateUser = () => {
    const newUser = { username, password };
    axios.post('http://localhost:5000/sign-up', newUser)
  }

  const verifyFields = () => {
    const regexUsername = /[\w]{4,10}/i
    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/gm
  
    let isWrong = false;
    if ([username, password, repeatPassword].includes('')) isWrong = true;
    if (!regexUsername.test(username)) isWrong = true;
    if (!regexPassword.test(password)) isWrong = true;
    if (password !== repeatPassword) isWrong = true;

    setDisabled(isWrong);
  }

  useEffect(() => {
    verifyFields();
  }, [username, password, repeatPassword])

  return (
    <div className={ Style.page } >
      <form className={ Style.container }>
        <h1 className="hero-title">Sign Up</h1>
        <label htmlFor='username-id'>
          Apelido:
          <input
            className={ Style.loginInput }
            placeholder='Apelido'
            id='username-id'
            type="text"
            onChange={ ({ target: { value } }) => setUsername(value) }
            value={ username }
          />
        </label>
        <label htmlFor='password-id'>
          Senha:
          <input
            onFocus={ () => setPasswordActive(true) }
            onBlur={ () => setPasswordActive(false) }
            className={ Style.loginInput }
            placeholder='Senha'
            id='password-id'
            type="password"
            onChange={ ({ target: { value } }) => setPassword(value) }
            value={ password }
          />
        </label>
        <label htmlFor='repeat-password-id'>
          Digite novamente a senha:
          <input
            onFocus={ () => setPasswordActive(true) }
            onBlur={ () => setPasswordActive(false) }
            className={ Style.loginInput }
            placeholder='Digite novamente a senha'
            id='repeat-password-id'
            type="password"
            onChange={ ({ target: { value } }) => setRepeatPassword(value) }
            value={ repeatPassword }
          />
        </label>
        <div 
          style={ { 'display': `${isPasswordActive ? 'block' : 'none'}` } }
          className={ Style.passwordOptions }
        >
          <p>Senha com pelo menos:</p>
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