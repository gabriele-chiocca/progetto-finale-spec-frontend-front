import { useEffect, useState } from 'react';
import { getAllAnimeDetails } from '../services/animeApi';

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
          return (
            <div className="col-12 col-md-6 col-lg-4" key={anime.id}>
              <div className="card h-100">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="card-img-top"
                />

                <div className="card-body">
                  <h2 className="h5">{anime.title}</h2>
                  <p>{anime.category}</p>
                  <p>Rating: {anime.rating}</p>
                  <p>{anime.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
