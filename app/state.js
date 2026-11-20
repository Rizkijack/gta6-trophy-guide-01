const PROGRESS_KEY = 'gta6-trophy-progress';
const SPOILER_KEY = 'gta6-spoiler';

export function loadProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]')); }
  catch { return new Set(); }
}
export function saveProgress(set) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...set]));
}
export function loadSpoiler() {
  return localStorage.getItem(SPOILER_KEY) === '1';
}
export function saveSpoiler(v) {
  localStorage.setItem(SPOILER_KEY, v ? '1' : '0');
}
export function exportProgress(set) {
  const blob = new Blob([JSON.stringify([...set], null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gta6-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
}
export async function importProgress(file) {
  const text = await file.text();
  const arr = JSON.parse(text);
  return new Set(arr);
}
