import { fetchUsers } from './fetch/users';

const getPlayers = async (token) => {
  const users = await fetchUsers(token);

  const usersAndPoints = users.reduce((arr, { completed_quizes: completedQuizes, nickname }) => {
    if (!completedQuizes.length) return arr;

    const score = completedQuizes.reduce((acc, { score }) => acc + score, 0);
    return [ ...arr, { nickname, score, completedQuizes } ];
  }, []);
  usersAndPoints.sort(({ score: a }, { score: b }) => b - a);

  return usersAndPoints;
};

const getPlayersByFilter = async (token, type, difficulty) => {
  const players = await getPlayers(token);

  const filteredPlayers = players.map(({ completedQuizes, nickname }) => {
    const score = completedQuizes.reduce((acc, cur) => {
      const ALL = 'All';
      const sum = () => acc += cur.score;

      if (type === ALL && difficulty === ALL) return sum();
      if (type === ALL && difficulty === cur.difficulty) return sum();
      if (difficulty === ALL && type === cur.type) return sum();
      if (difficulty === cur.difficulty && type === cur.type) return sum();
      return acc;
    }, 0);
    return { nickname, score };
  });
  const topTenPlayers = filteredPlayers
    .sort(({ score: a }, { score: b }) => b - a)
    .slice(0, 10);

  return topTenPlayers;
}

const getPlayersAround = async (token, nickname) => {
  const players = await getPlayers(token);

  const userPosition = players.findIndex(({ nickname: ply3rNickname }) => ply3rNickname === nickname);

  const usersAround = players.reduce((acc, cur, index) => {
    if (acc.length === 10) return acc;
    if (index >= userPosition - 5) return [ ...acc, cur ];
    return acc;
  }, []);

  return usersAround;
};

const createTable = (players) => {
  const rows = players.map(({ nickname, score }, index) => (
    <tr key={ `jogador-${nickname}` }>
      <td>{ index + 1 + 'º' }</td>
      <td>{ nickname }</td>
      <td>{ score }</td>
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>
          <th>Posição</th>
          <th>Jogador</th>
          <th>Pontuação</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
  );
};

export {
  getPlayersByFilter,
  getPlayersAround,
  createTable
}