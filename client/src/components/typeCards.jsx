import { useContext } from 'react';
import { infoContext } from '../providers/InfoProvider';
import { typeCardsContext } from '../providers/TypeCardsProvider';
import TypeCard from './typeCard';
import SelectDifficulty from './selectDifficulty';

const TypeCards = ({ isMini, isActive }) => {
  const { questions, types, userInfo } = useContext(infoContext);
  const { completed_questions: completedQuestions = [] } = userInfo;

  const filterByType = (type) => {
    const completed = completedQuestions.filter(({ type: completedType }) => completedType === type).length;
    const total = questions.filter(({ type: questionType }) => questionType === type).length;
    let progress = Math.round(completed / total * 100);
    if (!progress) progress = 0;

    return { completed, total, progress };
  }

  const createCardActive = () => {
    const { active, setSelected, setActive } = useContext(typeCardsContext);
    const { name, color, difficulty } = types.find(({ name }) => name === active);
    const { completed, total } = filterByType(name);
    return (
      <>
        <div
          onClick={() => {
            setActive(null);
            setSelected(null);
          }}
          className="backpage on-active-card"
        />
        <div key={`typeCard-${name}-active`} className="active-card">
          <TypeCard
            name={name}
            color={color}
            difficulty={difficulty}
            completedQuestions={completed}
            totalQuestions={total}
            activeCard
          />
          <SelectDifficulty color={color} />
        </div>
      </>
    );
  }

  const createCards = () =>
    types.map(({ name, color, difficulty }) => {
      const { completed, total, progress } = filterByType(name);
      return (
        !isMini
          ? (
            <div key={`typeCard-${name}`} className="type-container">
              <TypeCard
                name={name}
                color={color}
                difficulty={difficulty}
                completedQuestions={completed}
                totalQuestions={total}
              />
            </div>
          ) : (
            <div
              key={`${name}-question-card`}
              className="question-card"
            >
              <p style={{ color: `#${color}` }} >{name}</p>
              <p>{completed}/{total} | {progress}%</p>
            </div>
          )
      );
    });

  return !isActive ? createCards() : createCardActive()

}

export default TypeCards;