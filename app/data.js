const DATA_URL = 'data/trophies.json';

export async function loadTrophies() {
  const res = await fetch(DATA_URL);
  const json = await res.json();
  return Array.isArray(json) ? json : (json.trophies || []);
}
