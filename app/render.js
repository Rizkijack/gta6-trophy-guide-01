import { isHiddenBySpoiler } from './filter.js';

export function renderList(container, trophies, state) {
  container.replaceChildren();
  for (const t of trophies) {
    const hidden = isHiddenBySpoiler(t, state.spoiler, state.earned);
    const card = document.createElement('div');
    card.className = 'card' + (state.earned.has(t.name) ? ' earned' : '') + (hidden ? ' hidden-trophy' : '');
    card.dataset.name = t.name;

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = state.earned.has(t.name);
    box.addEventListener('change', () => {
      if (box.checked) state.earned.add(t.name); else state.earned.delete(t.name);
      state.save();
      state.render();
    });

    const body = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = hidden ? 'Hidden story trophy' : t.name;
    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.textContent = hidden ? 'Earn to reveal name and description.' : t.description;
    const meta = document.createElement('div');
    meta.className = 'meta';
    const g = document.createElement('span');
    g.className = 'badge grade-' + t.grade;
    g.textContent = t.grade;
    meta.append(g);
    const k = document.createElement('span');
    k.className = 'badge kind';
    k.textContent = t.kind;
    meta.append(k);
    if (t.missable) {
      const m = document.createElement('span');
      m.className = 'badge missable';
      m.textContent = 'missable';
      meta.append(m);
    }
    body.append(name, desc, meta);

    const side = document.createElement('div');
    const pct = document.createElement('span');
    pct.className = 'badge';
    pct.textContent = t.roadmap_stage ? 'stage ' + t.roadmap_stage : '';
    side.append(pct);

    card.append(box, body, side);
    card.addEventListener('click', (e) => {
      if (e.target === box) return;
      state.selected = t.name;
      state.renderDetail();
    });
    if (state.selected === t.name) card.classList.add('selected');
    container.append(card);
  }
}

export function renderDetail(panel, trophy, state) {
  panel.replaceChildren();
  if (!trophy) { panel.innerHTML = '<p class="empty">Select a trophy to read its guide.</p>'; return; }
  const hidden = isHiddenBySpoiler(trophy, state.spoiler, state.earned);
  const h2 = document.createElement('h2');
  h2.textContent = hidden ? 'Hidden story trophy' : trophy.name;
  panel.append(h2);

  const grade = document.createElement('div');
  grade.className = 'grade';
  grade.textContent = trophy.grade + '  \u00b7  ' + trophy.kind + (trophy.missable ? '  \u00b7  MISSABLE' : '');
  panel.append(grade);

  const desc = document.createElement('div');
  desc.className = 'desc';
  desc.textContent = hidden ? 'Earn this trophy to reveal its official description.' : trophy.description;
  panel.append(desc);

  if (trophy.missable && trophy.missable_reason) {
    const warn = document.createElement('div');
    warn.className = 'warn';
    warn.textContent = 'Missable: ' + trophy.missable_reason;
    panel.append(warn);
  }

  if (hidden) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'Spoiler mode is on: earn this trophy to unlock its guide, steps and sources.';
    panel.append(p);
    return;
  }

  const gSec = document.createElement('div');
  gSec.className = 'section';
  const gh = document.createElement('h3'); gh.textContent = 'Guide'; gSec.append(gh);
  const gp = document.createElement('p'); gp.textContent = trophy.guide; gSec.append(gp);
  panel.append(gSec);

  if (trophy.steps && trophy.steps.length) {
    const sSec = document.createElement('div');
    sSec.className = 'section';
    const sh = document.createElement('h3'); sh.textContent = 'Steps'; sSec.append(sh);
    const ol = document.createElement('ol');
    for (const s of trophy.steps) { const li = document.createElement('li'); li.textContent = s; ol.append(li); }
    sSec.append(ol);
    panel.append(sSec);
  }

  const srcSec = document.createElement('div');
  srcSec.className = 'section';
  const sh = document.createElement('h3'); sh.textContent = 'Sources'; srcSec.append(sh);
  for (const s of (trophy.sources || [])) {
    const d = document.createElement('div');
    d.className = 'source';
    const a = document.createElement('a');
    a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.textContent = s.name;
    d.append(a);
    const span = document.createElement('span');
    span.className = 'muted';
    span.textContent = ' \u2014 ' + s.url;
    span.style.color = 'var(--muted)';
    span.style.fontSize = '12px';
    d.append(span);
    srcSec.append(d);
  }
  if (trophy.roadmap_stage) {
    const r = document.createElement('div');
    r.className = 'meta-row';
    const b = document.createElement('span');
    b.className = 'badge';
    b.textContent = 'roadmap stage ' + trophy.roadmap_stage;
    r.append(b);
    srcSec.append(r);
  }
  panel.append(srcSec);
}
