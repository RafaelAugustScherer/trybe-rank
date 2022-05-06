import { fetchUsers } from './fetch/users';

const getPlayers = async (token, userInfo) => {
  const users = await fetchUsers(token) || [];
  
  if (userInfo && userInfo.is_guest) {
    users.push({ ...userInfo });
  }

  const usersAndPoints = users.reduce((arr, { completed_quizes: completedQuizes, nickname }) => {
    let score;

    if (!completedQuizes.length && nickname !== userInfo.nickname) {
      return arr;
    } else if (!completedQuizes.length) {
      score = 0;
    } else {
      score = completedQuizes.reduce((acc, { score }) => acc + score, 0);
    }

    return [ ...arr, { nickname, score, completedQuizes } ];
  }, []);
  usersAndPoints.sort(({ score: a, nickname }, { score: b }) => {
    if (b - a === 0 && nickname === userInfo.nickname) {
      return -1;
    }
    return b - a;
  });

  return usersAndPoints;
};

const getPlayersByFilter = async (token, type, difficulty, userInfo) => {
  const players = await getPlayers(token, userInfo);

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

const getPlayersAround = async (token, userInfo) => {
  const players = await getPlayers(token, userInfo);
  const { nickname } = userInfo;

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