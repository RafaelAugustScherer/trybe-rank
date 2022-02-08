import { fetchUsers } from './fetch/users';

const getPlayers = async () => {
  const users = await fetchUsers(token);

  const usersAndPoints = users
    .reduce((arr, { completed_quizes, nickname }) => {
      if (!completed_quizes.length) return arr;

      const score = completed_quizes.reduce((acc, { score }) => acc + score, 0);
      return { nickname, score };
    }, [])
    .sort(({ score: a }, { score: b }) => b - a);

  return usersAndPoints;
}

const getPlayersByFilter = async (type, difficulty) => {
  const players = await getPlayers();

  const filteredPlayers = players.map(({ completed_quizes: completedQuizes, nickname }) => {
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

const getPlayersAround = async (nickname) => {
  const players = await getPlayers();

  const userPosition = players.findIndex(({ nickname: ply3rNickname }) => ply3rNickname === nickname);

  const usersAround = players.reduce((acc, cur, index) => {
    if (acc.length === 10) return acc;
    if (index >= userPosition - 5) return [ ...acc, cur ];
    return acc;
  }, []);

  return usersAround;
}

export {
  getPlayersByFilter,
  getPlayersAround
}