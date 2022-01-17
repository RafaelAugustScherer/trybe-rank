import trybeIcon from '../svg/trybeIcon.svg'
import Style from '../css/Login.module.css'

function Login() {

  return (
    <div className={Style.page}>
      <div className={ Style.container}>
        <div className={ Style.imgContainer}>
        <h1>Trybe Rank</h1>
        <img src={trybeIcon} alt="" />
        </div>
        <input type="email" />
        <input type="password" />
        <button type="button">Entrar</button>
        <p>Entrar como convidado</p>
      </div>
    </div>
  );
}

export default Login;