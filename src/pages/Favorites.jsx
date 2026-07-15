import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllAnimeDetails } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';

function Favorites() {
  const { favoriteIds, addToFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getAnime() {
      try {
        const data = await getAllAnimeDetails();
        console.log(data);
        setAnimes(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

    getAnime();
  }, [favoriteIds]);

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

  const filteredAnimes = animes.filter((anime) => {
    return favoriteIds.includes(anime.id);
  });

  return (
    <div className="container">
      <h1 className="text-center my-4">Favorites Anime </h1>

      <div className="row">
        {filteredAnimes.map((anime) => {
          return <AnimeCard anime={anime} key={anime.id} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
