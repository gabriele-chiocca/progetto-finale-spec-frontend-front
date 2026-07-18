import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

function CompareCard({ anime, onRemove }) {
  if (!anime) {
    return null;
  }

  return (
    <div className="card h-100 pb-2">
      <img
        className="card-img-top compare-img"
        src={anime.image}
        alt={anime.title}
      />
      <div className="card-body">
        <h2>{anime.title}</h2>
        <RatingStars rating={anime.rating}></RatingStars>

        <div className="mb-3">
          <p className="fw-bold mb-1">Category</p>
          <p>{anime.category}</p>
        </div>
        <div className="mb-3">
          <p className="fw-bold mb-1">Status</p>
          <p>{anime.status}</p>
        </div>
        <div className="mb-3">
          <p className="fw-bold mb-1">Seasons</p>
          <p>{anime.seasons}</p>
        </div>
        <div className="mb-3">
          <p className="fw-bold mb-1">Episodes</p>
          <p>{anime.episodes}</p>
        </div>

        <div className="mb-3">
          <p className="fw-bold mb-1">Release Year</p>
          <p>{anime.releaseYear}</p>
        </div>

        <div className="mb-3">
          <p className="fw-bold mb-1">Studio</p>
          <p>{anime.studio}</p>
        </div>

        <div className="mb-3">
          <button onClick={() => onRemove(anime.id)} className="btn btn-danger">
            <i className=" bi bi-columns-gap me-2"></i>
            Remove Compare
          </button>

          <Link to={`/anime/${anime.id}`} className="btn btn-dark ms-3">
            <i className="bi bi-eye me-2"></i>
            View Details
          </Link>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default CompareCard;
