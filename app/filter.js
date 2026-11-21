// Filters the trophy list by kind, grade, missable flag, and a free-text query.
// Spoiler hiding is handled separately in isHiddenBySpoiler (render layer).
export function applyFilters(trophies, { query, kind, grade, missableOnly, spoiler, earned }) {">
  const q = (query || '').trim().toLowerCase();
  return trophies.filter(t => {
    if (kind !== 'all' && t.kind !== kind) return false;
    if (grade !== 'all' && t.grade !== grade) return false;
    if (missableOnly && !t.missable) return false;
    if (q) {
      const hay = [t.name, t.description, t.guide, (t.steps||[]).join(' ')].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
export function isHiddenBySpoiler(t, spoiler, earned) {
  return spoiler && t.kind === 'story' && !earned.has(t.name);
}
