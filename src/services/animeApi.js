const API_URL = 'http://localhost:3001';

export async function getAnimes() {
  const response = await fetch(`${API_URL}/animes`);

  if (!response.ok) {
    throw new Error('Errore nel recupero degli anime');
  }
  const data = await response.json();

  return data;
}

export async function getAnimesById(id) {
  const response = await fetch(`${API_URL}/animes/${id}`);

  if (!response.ok) {
    throw new Error('Errore nel recupero dello specifico anime');
  }
  const data = await response.json();

  return data.anime;
}

export async function getAllAnimeDetails() {
  const animeList = await getAnimes();

  const promises = animeList.map((anime) => getAnimesById(anime.id));

  return Promise.all(promises);
}
