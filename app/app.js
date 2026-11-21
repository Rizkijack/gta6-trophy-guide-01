import { loadTrophies } from './data.js';
import { loadProgress, saveProgress, loadSpoiler, saveSpoiler, exportProgress, importProgress } from './state.js';
import { applyFilters } from './filter.js';
import { renderList, renderDetail } from './render.js';
import { renderRoadmap } from './roadmap.js';

const trophies = await loadTrophies();
let earned = loadProgress();
let spoiler = loadSpoiler();
let selected = null;
let view = 'checklist';

const state = {
  earned,
  spoiler,
  selected,
  save: () => saveProgress(earned),
  render: () => renderAll(),
  renderDetail: () => renderDetailPanel(),
};

const listEl = document.getElementById('list');
const detailEl = document.getElementById('detail');
const roadmapEl = document.getElementById('roadmap');
const progressEl = document.getElementById('progress');

function visibleTrophies() {
  return applyFilters(trophies, {
    query: document.getElementById('search').value,
    kind: document.getElementById('kind').value,
    grade: document.getElementById('grade').value,
    missableOnly: document.getElementById('missableOnly').checked,
    spoiler,
    earned,
  });
}

function renderAll() {
  progressEl.textContent = earned.size + ' of ' + trophies.length + ' earned';
  document.getElementById('spoiler').checked = spoiler;
  if (view === 'checklist') {
    renderList(listEl, visibleTrophies(), state);
  } else {
    renderRoadmap(roadmapEl, trophies, state);
  }
}

function renderDetailPanel() {
  const t = trophies.find(x => x.name === state.selected);
  renderDetail(detailEl, t, state);
}

// view tabs
document.querySelectorAll('.views button').forEach(btn => {
  btn.addEventListener('click', () => {
    view = btn.dataset.view;
    document.querySelectorAll('.views button').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
    renderAll();
    if (view === 'checklist' && state.selected) renderDetailPanel();
  });
});

document.getElementById('search').addEventListener('input', renderAll);
document.getElementById('kind').addEventListener('change', renderAll);
document.getElementById('grade').addEventListener('change', renderAll);
document.getElementById('missableOnly').addEventListener('change', renderAll);
document.getElementById('spoiler').addEventListener('change', (e) => {
  spoiler = e.target.checked;
  saveSpoiler(spoiler);
  state.spoiler = spoiler;
  renderAll();
  if (state.selected) renderDetailPanel();
});

document.getElementById('export').addEventListener('click', () => exportProgress(earned));
document.getElementById('import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    earned = await importProgress(file);
    state.earned = earned;
    saveProgress(earned);
    renderAll();
  } catch (err) { alert('Import failed: ' + err.message); }
});

state.render = renderAll;
state.save = () => saveProgress(earned);
renderAll();
