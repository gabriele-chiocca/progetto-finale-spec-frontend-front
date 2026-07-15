import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const savedFavorites = localStorage.getItem(`favoriteIds`);

    if (savedFavorites === null) {
      return [];
    }

    return JSON.parse(savedFavorites);
  });

  useEffect(() => {
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function addToFavorite(id) {
    setFavoriteIds([...favoriteIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteIds(
      favoriteIds.filter((singleId) => {
        return id !== singleId;
      }),
    );
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, setFavoriteIds }}>
      {children}
    </FavoritesContext.Provider>
  );
}
