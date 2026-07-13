import { useEffect, useState } from 'react';
import { getAllAnimeDetails } from '../services/animeApi';

function Home() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnimes() {
      try {
        const data = await getAllAnimeDetails();
        setAnime(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    return () => {};
  }, []);

  return <h1>Home</h1>;
}

export default Home;
