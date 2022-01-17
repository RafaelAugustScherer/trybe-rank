const type = [
  {
    id: 1,
    name: 'map',
    difficulty: 2
  },
  {
    id: 2,
    name: 'reduce',
    difficulty: 5
  },
  {
    id: 3,
    name: 'filter',
    difficulty: 3
  },
]

const data = [
  {
    type: 1,
    question: 'Primeira questão',
    correct_answer: '1',
    wrong_answers: ['2', '3', '4']
  },
  {
    type: 1,
    question: 'Segunda questão',
    correct_answer: '2',
    wrong_answers: ['1', '3', '4']
  },
  {
    type: 1,
    question: 'Terceira questão',
    correct_answer: '3',
    wrong_answers: ['2', '1', '4']
  }
];

const gameData = { data, type }

export default gameData;
