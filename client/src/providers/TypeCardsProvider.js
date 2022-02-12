import { createContext, useState } from 'react';

export const typeCardsContext = createContext();

const TypeCardsProvider = ({ children }) => {
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(null);

  const value = {
    selected,
    active,
    setSelected,
    setActive
  }

  return (
    <typeCardsContext.Provider value={ value }>
      { children }
    </typeCardsContext.Provider>
  );
}

export default TypeCardsProvider;