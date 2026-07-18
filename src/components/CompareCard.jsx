import RatingStars from './RatingStars';

function CompareCard({ anime }) {
  return (
    <div className="card h-100 pb-2">
      <img
        className="card-img-top product-img"
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
      </div>
    </div>
  );
}

export default CompareCard;
