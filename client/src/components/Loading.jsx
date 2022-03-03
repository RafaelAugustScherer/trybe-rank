import logo from "../img/trybe-icon.png";
import loading from '../img/loading.gif';

const Loading = () => {
  return (
    <div className="loading-page">
      <div className="loading-container">
        <div className="logo-container-loading">
          <img src={ logo } alt="logo da trybe" />
          <h1>TrybeRank</h1>
        </div>
        <div>
          <img src={ loading } alt="loading" />
        </div>
      </div>
    </div>
  )
}

export default Loading;
