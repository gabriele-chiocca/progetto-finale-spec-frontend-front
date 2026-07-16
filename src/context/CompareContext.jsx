import { createContext, useState } from 'react';

export const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);

  function addToCompare(id) {
    if (compareIds.includes(id)) {
      return;
    }

    if (compareIds.length > 1) {
      return;
    }

    setCompareIds([...compareIds, id]);
  }

  function removeCompare(id) {
    setCompareIds(
      compareIds.filter((compareId) => {
        return id !== compareId;
      }),
    );
  }

  function isCompared(id) {
    return compareIds.includes(id);
  }

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeCompare,
        isCompared,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
