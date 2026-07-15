import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    //Controllo se nel local storage sono già presenti dei favorite
    const savedFavorites = localStorage.getItem(`favoriteIds`);

    if (savedFavorites === null) {
      // Se non ci sono ritorna un array vuoto
      return [];
    }

    return JSON.parse(savedFavorites);
  });

  useEffect(() => {
    // UseEffect che si aggiorna ad ogni cambiamento su favoriteIds, aggiornando con il setItem
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

  function isFavorite(id) {
    return favoriteIds.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        setFavoriteIds,
        addToFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
