import { useContext, useEffect, useState } from "react";
import { infoContext } from "../providers/InfoProvider";
import { getPlayersByFilter, createTable } from '../utils/leaderboard';
import '../css/Leaderboard.css';
import Menu from "../components/Menu";

const Leaderboard = () => {
  const [type, setType] = useState('All');
  const [difficulty, setDificulty] = useState('All')
  const [players, setPlayers] = useState([]);
  const { types, token, userInfo } = useContext(infoContext);

  const getPlayers = async () => {
    const newPlayers = await getPlayersByFilter(token, type, difficulty, userInfo);
    setPlayers(newPlayers);
  }

  useEffect(() => {
    token && getPlayers();
  }, [token, type, difficulty]);

  const renderOptions = (option) => {
    let options;

    if (option === 'type') {
      options = types.map(({ name }) => (
        <option key={ `option - ${name}` } value={ name }>{ name }</option>
      ))
    } else {
      const difficulties = ['Iniciante', 'Intermediario', 'Dificil']
      options = difficulties.map((dificulty) => (
        <option key={ `option - ${dificulty}` } value={ dificulty }>{ dificulty }</option>
      ))
    }
    return options;
  }

  return (
    <>
      <Menu path="leaderboard"/>
      <div className="leaderboard-page">
        <h1 className="hero-title">
        { `
          Leaderboard
          ${ type !== 'All' ? ` de ${type}` : '' }
          ${ difficulty !== 'All' ? ` (${difficulty})` : ''}
        ` }
        </h1>
        <div>
          <div className="leaderbord-container">
            <h3>Filtros:</h3>
            <div className="filter-container">
              <label>
                Por tipo:
                <select value={ type } onChange={ ({ target: { value } }) => setType(value) } >
                  <option value={'All'}>All</option>
                  { renderOptions('type') }
                </select>
              </label>
              <label>
                Por dificuldade:
                <select value={ difficulty } onChange={ ({ target: { value } }) => setDificulty(value) } >
                  <option value={'All'}>All</option>
                  { renderOptions('dificulty') }
                </select>
              </label>
            </div>
            <div className="leaderboard">
              { !!players.length && createTable(players) }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Leaderboard;