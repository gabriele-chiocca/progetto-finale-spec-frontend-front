import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import RatingStars from './RatingStars';
import { CompareContext } from '../context/CompareContext';

function AnimeCard({ anime }) {
  const { favoriteIds, addToFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const { compareIds, addToCompare, removeCompare, isCompared } =
    useContext(CompareContext);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 pb-2">
        <img
          src={anime.image}
          alt={anime.title}
          className="card-img-top product-img"
        />

        <div className="card-body d-flex flex-column">
          <h2 className="h5">{anime.title}</h2>
          <p>{anime.category}</p>
          <RatingStars rating={anime.rating}></RatingStars>
          <p>{anime.description}</p>

          <div className="row g-3 mt-auto">
            <div className="col-12">
              <Link to={`/anime/${anime.id}`} className="btn btn-dark">
                View Details
              </Link>
            </div>

            <div className="col-6">
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
            </div>

            <div className="col-6">
              {isCompared(anime.id) ? (
                <button
                  onClick={() => removeCompare(anime.id)}
                  className="btn btn-danger"
                >
                  <i className="bi bi bi-columns-gap me-2"></i>
                  Remove from Compare
                </button>
              ) : (
                <button
                  onClick={() => addToCompare(anime.id)}
                  className="btn btn-info"
                >
                  <i className="bi bi bi-columns-gap me-2"></i>
                  Add to Compare
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
