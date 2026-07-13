import { useEffect, useState } from 'react';
import { getAllAnimeDetails } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';

function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnimes() {
      try {
        const data = await getAllAnimeDetails();
        setAnimes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnimes();
  }, []);

  if (loading) {
    return <p>Caricamento Anime</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Anime</h1>
      <div className="row g-4">
        {animes.map((anime) => {
          return <AnimeCard anime={anime} key={anime.id} />;
        })}
      </div>
    </div>
  );
}

export default Home;
