import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAnimesById } from '../services/animeApi';

function Favorites() {
  const { favoriteIds, addToFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState('');

  if (favoriteIds.length === 0) {
    return (
      <div className="container">
        <div className="text-center mt-4">
          <h1>No favorite anime selected</h1>
          <p>Add your favorite animes from the list</p>
          <Link to={'/'} className="btn btn-primary">
            Discover Animes
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    async function loadSingleAnime() {
      const data = await getAnimesById(favoriteIds);
      console.log(data);
      setAnimes(data);

      try {
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    loadSingleAnime();
  }, [favoriteIds]);

  return (
    <div className="container">
      <h1 className="text-center">Favorites Anime</h1>

      <div className="row">
        {animes.map((anime) => {
          return <AnimeCard anime={anime} key={anime.id} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
