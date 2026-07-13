import { Link } from 'react-router-dom';

function AnimeCard({ anime }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100">
        <img
          src={anime.image}
          alt={anime.title}
          className="card-img-top product-img"
        />

        <div className="card-body">
          <h2 className="h5">{anime.title}</h2>
          <p>{anime.category}</p>
          <p>Rating: {anime.rating}</p>
          <p>{anime.description}</p>

          <Link to={`/anime/${anime.id}`} className="btn btn-primary">
            Scopri di più
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
