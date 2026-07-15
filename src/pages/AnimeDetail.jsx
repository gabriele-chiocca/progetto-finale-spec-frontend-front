import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAnimesById } from '../services/animeApi';

import { Link } from 'react-router-dom';

function AnimeDetail() {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function loadAnime() {
      try {
        const data = await getAnimesById(id);

        setAnime(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnime();
  }, [id]);

  if (loading) {
    return <p>Pagina in caricamento</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-lg-5">
          <div>
            <Link className="h6 text-secondary" to={'/'}>
              <i className="bi bi-arrow-left-short h2"></i>
            </Link>

            <div>
              <h1>{anime.title}</h1>
            </div>
            <img
              className="img-fluid w-100 mt-3"
              src={anime.image}
              alt={anime.title}
            />
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div>
            <div className="my-3">
              <button className="btn btn-primary">Aggiungi ai preferiti</button>
              <button className="btn btn-secondary ms-2">Confronta</button>
            </div>

            <div>
              <h2 className="h4 my-4">General Info</h2>
              <div>
                <h3 className="h5">Studio</h3>
                <p>{anime.studio}</p>
              </div>

              <div>
                <h3 className="h5">Rating</h3>
                <p>{anime.rating}</p>
              </div>

              <div>
                <h3 className="h5">Total Episodes</h3>
                <p>{anime.episodes}</p>
              </div>

              <div>
                <h3 className="h5">Total Seasons</h3>
                <p>{anime.seasons}</p>
              </div>

              <div>
                <h3 className="h5">Description</h3>
                <p>{anime.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 gy-5">
          <h2 className="mb-3">Trailer</h2>
          <iframe
            width="100%"
            height="500"
            src={anime.trailerUrl}
            title={`Trailer of ${anime.title}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;
