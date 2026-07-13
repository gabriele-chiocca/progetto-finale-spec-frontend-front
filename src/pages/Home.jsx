import { useEffect, useState } from 'react';
import { getAllAnimeDetails } from '../services/animeApi';
import AnimeCard from '../components/AnimeCard';

function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('A-Z');

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

  const filteredAnimes = animes
    .filter((anime) => {
      const formattedTitleAnime = anime.title.toLowerCase();

      const formattedInput = search.toLowerCase();

      const matchesTitle = formattedTitleAnime.includes(formattedInput);

      const matchesCategory =
        selectedCategory === '' || anime.category === selectedCategory;

      return matchesTitle && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'Z-A') {
        return b.title.localeCompare(a.title);
      }
      return a.title.localeCompare(b.title);
    });
  return (
    <div className="container py-4">
      <h1 className="mb-4">Anime</h1>
      <div className="search-container mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      <div className="row g-4">
        <div className="mb-4 col-6">
          <select
            className="form-select"
            aria-label="Default select example"
            placeholder="Scegli la categoria"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">Filter Category</option>
            <option value="Shonen">Shonen</option>
            <option value="Psychological">Psychological</option>
            <option value="Adventure">Adventure</option>
            <option value="Seinen">Seinen</option>
            <option value="Isekai">Isekai</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="col-6">
          <select
            className="form-select col-6"
            aria-label="Default select example"
            placeholder="Scegli la categoria"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

        {filteredAnimes.map((anime) => {
          return <AnimeCard anime={anime} key={anime.id} />;
        })}
      </div>
    </div>
  );
}

export default Home;
