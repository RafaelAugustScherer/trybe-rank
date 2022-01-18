export const types = [
  {
    id: 1,
    name: 'map',
    color: 'FAFF00',
    difficulty: 2
  },
  {
    id: 2,
    name: 'reduce',
    color: '00E593',
    difficulty: 5
  },
  {
    id: 3,
    name: 'filter',
    color: 'FFA800',
    difficulty: 3
  },
];

export const questions_completed = [
  {
    user_id: 1,
    question_id: 1,
    type_id: 1,
  },
  {
    user_id: 1,
    question_id: 2,
    type_id: 1,
  },
];

export const questions = [
  {
    pergunta: 'Primeira questão',
    type_id: 1,
    dificuldade: 1,
    id_correto: 1,
    alternativas: {
      4564: '2',
      1: '1',
      8974: '3',
      8944: '4'
    }
  },
  {
    pergunta: 'Segunda questão',
    type_id: 1,
    dificuldade: 1,
    id_correto: 2,
    alternativas: {
      4564: '1',
      2: '2',
      8974: '3',
      8954: '4'
    }
  },
  {
    pergunta: 'Segunda questão',
    type_id: 1,
    dificuldade: 1,
    id_correto: 3,
    alternativas: {
      4564: '1',
      3: '3',
      8974: '2',
      8984: '4'
    }
  },
];
