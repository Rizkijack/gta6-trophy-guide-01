const STAGE_NAMES = {
  1: 'Story chapters & missions',
  2: 'Stranger & side-character questlines',
  3: 'Missables (do not skip)',
  4: 'Collectibles & exploration counts',
  5: 'Activities, combat, money & easter eggs',
  6: '100% completion (A Long Road)',
  7: 'Platinum',
};

export function renderRoadmap(container, trophies, state) {
  container.replaceChildren();
  const groups = new Map();
  for (const t of trophies) {
    const s = t.roadmap_stage || 0;
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s).push(t);
  }
  const stages = [...groups.keys()].sort((a,b)=>a-b);
  for (const s of stages) {
    const items = groups.get(s);
    const earnedCount = items.filter(t=>state.earned.has(t.name)).length;
    const card = document.createElement('div');
    card.className = 'roadmap-stage';
    const h = document.createElement('h3');
    h.textContent = (STAGE_NAMES[s] || ('Stage ' + s));
    card.append(h);
    const c = document.createElement('div');
    c.className = 'count';
    c.textContent = items.length + ' trophies \u00b7 ' + earnedCount + ' earned';
    card.append(c);
    const ul = document.createElement('ul');
    for (const t of items) {
      const li = document.createElement('li');
      const hidden = state.spoiler && t.kind === 'story' && !state.earned.has(t.name);
      const name = hidden ? 'Hidden story trophy' : t.name;
      const miss = t.missable ? ' [MISSABLE]' : '';
      li.textContent = name + ' (' + t.grade + ')' + miss;
      if (state.earned.has(t.name)) li.style.textDecoration = 'line-through';
      if (t.missable) li.style.color = '#ff9999';
      ul.append(li);
    }
    card.append(ul);
    container.append(card);
  }
}
