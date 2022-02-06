import axios from 'axios';

const fetchCompletedQuestions = async (token) => {
  const headers = { 'Authorization': `${token}` };
  const data = await axios.get('http://localhost:5000/user', { headers })
    .then((res) => res.data)
    .then(({ user: { completed_questions } }) => completed_questions)
    .catch(() => []);

  return data;
}

export { fetchCompletedQuestions };