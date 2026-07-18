import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { getAnimesById } from '../services/animeApi';

import RatingStars from '../components/RatingStars';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

import { CompareContext } from '../context/CompareContext';

function AnimeDetail() {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { favoriteIds, addToFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const { compareIds, addToCompare, removeCompare, isCompared } =
    useContext(CompareContext);

  const navigate = useNavigate();

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
      <div>
        <button
          //Permette di tornare indietro sempre alla pagina precedente dell'ingresso al detail
          onClick={() => navigate(-1)}
          className="btn btn-white shadow-none"
        >
          <i className="bi h2 bi-arrow-left-short "></i>
        </button>

        <div>
          <h1>{anime.title}</h1>
          <RatingStars rating={anime.rating}></RatingStars>
        </div>
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <img
                className="detail-img rounded"
                src={anime.image}
                alt={anime.title}
              />
            </div>
            <div className="col-12 col-lg-6 gx-4 d-flex flex-column justify-content-center">
              <div className="ps-lg-4">
                <div className="row g-4">
                  <h2>Info</h2>
                  <div className="col-12 col-sm-6">
                    <p className="text-secondary mb-1">Studios</p>
                    <p className="fw-semibold mb-0">{anime.studio}</p>
                  </div>

                  <div className="col-12 col-sm-6">
                    <p className="text-secondary mb-1">Category</p>
                    <p className="fw-semibold mb-0">{anime.category}</p>
                  </div>

                  <div className="col-12 col-sm-6">
                    <p className="text-secondary mb-1">Episodes</p>
                    <p className="fw-semibold mb-0">{anime.episodes}</p>
                  </div>

                  <div className="col-12 col-sm-6">
                    <p className="text-secondary mb-1">Seasons</p>
                    <p className="fw-semibold mb-0">{anime.seasons}</p>
                  </div>

                  <div className="col-12 col-sm-6">
                    <p className="text-secondary mb-1">Status</p>
                    <p className="fw-semibold mb-0">{anime.status}</p>
                  </div>

                  <div className="col-12 col-sm-6">
                    <p className="text-secondary mb-1">Year</p>
                    <p className="fw-semibold mb-0">{anime.releaseYear}</p>
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-2 mt-5">
                  {isFavorite(anime.id) ? (
                    <button
                      onClick={() => removeFavorite(anime.id)}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-heart-fill me-2"></i>
                      Remove from Favorites
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFavorite(anime.id)}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-heart me-2"></i>
                      Add to Favorites
                    </button>
                  )}

                  {isCompared(anime.id) ? (
                    <button
                      onClick={() => removeCompare(anime.id)}
                      className="btn btn-danger"
                    >
                      <i className=" bi bi-columns-gap me-2"></i>
                      Remove Compare
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCompare(anime.id)}
                      className="btn btn-info "
                    >
                      <i className="bi bi-columns-gap me-2"></i>
                      Add Compare
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
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
