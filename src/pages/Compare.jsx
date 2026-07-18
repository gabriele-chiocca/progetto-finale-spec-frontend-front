import { useContext } from 'react';
import { CompareContext } from '../context/CompareContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllAnimeDetails } from '../services/animeApi';

import CompareCard from '../components/CompareCard';

function Compare() {
  const { compareIds, addToCompare, removeCompare, isCompared } =
    useContext(CompareContext);

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
  }, []);

  const comparedAnimes = animes.filter((anime) => {
    return compareIds.includes(anime.id);
  });

  if (compareIds.length === 0) {
    return (
      <div className="container">
        <div className="text-center mt-4">
          <h1>No compared anime selected</h1>
          <p>Add your animes to compare from the list</p>
          <Link to={'/'} className="btn btn-primary">
            Discover Animes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Compare Anime</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <CompareCard anime={comparedAnimes[0]} />
        </div>

        <div className="col-12 col-lg-6">
          {comparedAnimes[1] ? (
            <CompareCard anime={comparedAnimes[0]} />
          ) : (
            <div className="card">
              <div className="card-body">
                <h3>Select an anime to compare</h3>
                <Link className="btn btn-primary" to={'/'}>
                  Choose Anime to Compare
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Compare;
