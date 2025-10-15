/*  js/modifiers/index.js
 *  ─────────────────────────────────────────────────────────
 *  Вкладка «Модификаторы»
 *  – участники (scores)        · /api/scores
 *  – активные модификаторы     · /api/active_modifiers
 *  – применённые (прошлая игра)· localStorage
 */

/* ═════════════ 1. Socket + store ═════════════ */
const socket = io();

const store = {
  scores: {},
  activeMods: [],
  appliedMods: JSON.parse(localStorage.getItem('appliedModifiers') || '[]')
};

/* ═════════════ 2. Participants (список зрителей) ═════════════ */
function renderParticipants(scores) {
  const box = document.getElementById('mod-points-table');
  box.innerHTML = '';

  const tbl = el('table', 'modifiers-table');
  tbl.innerHTML =
    `<thead><tr><th>Зритель</th><th>Баланс</th></tr></thead><tbody></tbody>`;

  const tbody = tbl.querySelector('tbody');

  /* сортируем по балансу ↓ */
  const entries = Object.entries(scores)
    .sort(([, a], [, b]) => (b.current_balance ?? 0) - (a.current_balance ?? 0));

  if (entries.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="2" style="text-align:center; color:#666;">— пусто —</td></tr>';
  } else {
    entries.forEach(([name, data]) =>
      tbody.insertAdjacentHTML(
        'beforeend',
        `<tr>
           <td><span class="nickname">${name}</span></td>
           <td>${data.current_balance}</td>
         </tr>`
      )
    );
  }

  box.appendChild(tbl);
}


/* ═════════════ 3. Active modifiers ═════════════ */
function renderActiveModifiers() {
  const box = document.getElementById('active-modifiers-table');
  box.innerHTML = '';

  const tbl = el('table', 'modifiers-table');
  tbl.innerHTML =
    `<thead>
       <tr><th>Название</th><th>Описание</th><th>Кто активировал</th></tr>
     </thead><tbody></tbody>`;

  const tbody = tbl.querySelector('tbody');

  if (!store.activeMods.length) {
    tbody.innerHTML =
      '<tr><td colspan="3" style="text-align:center; color:#666;">— нет активных —</td></tr>';
  } else {
    store.activeMods.forEach(m =>
      tbody.insertAdjacentHTML(
        'beforeend',
        `<tr>
           <td>${m.name.toUpperCase()}</td>
           <td>${m.description}</td>
           <td><span class="nickname">${m.activated_by}</span></td>
         </tr>`
      )
    );
  }

  box.appendChild(tbl);
}

/* ═════════════ 4. Applied modifiers ═════════════ */
function renderAppliedModifiers() {
  const box = document.getElementById('applied-modifiers-table');
  if (!box) return;
  box.innerHTML = '';

  const tbl = el('table', 'modifiers-table');
  tbl.innerHTML =
    `<thead>
       <tr><th>Название</th><th>Описание</th><th>Кто активировал</th></tr>
     </thead><tbody></tbody>`;

  const tbody = tbl.querySelector('tbody');

  if (!store.appliedMods.length) {
    tbody.innerHTML =
      '<tr><td colspan="3" style="text-align:center; color:#666;">— пусто —</td></tr>';
  } else {
    store.appliedMods.forEach(m =>
      tbody.insertAdjacentHTML(
        'beforeend',
        `<tr>
           <td>${m.name.toUpperCase()}</td>
           <td>${m.description}</td>
           <td><span class="nickname">${m.activated_by}</span></td>
         </tr>`
      )
    );
  }

  box.appendChild(tbl);
}

/* ═════════════ 5. Socket events ═════════════ */
socket.on('scores:update', data => {
  store.scores = data;
  renderParticipants(data);
});

socket.on('mods:update', mods => {
  store.activeMods = mods;
  renderActiveModifiers();
});

/* ═════════════ 6. «Начать игру» ═════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('start-game-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    /* — подтверждение — */
    const ok = confirm('Начать новую игру?\nАктивные модификаторы будут применены, список активных очистится.');
    if (!ok) return;                       // пользователь передумал

    /* ─── вариант 1: активных нет → просто очищаем применённые ─── */
    if (!store.activeMods.length) {
      store.appliedMods = [];
      localStorage.setItem('appliedModifiers', '[]');
      renderAppliedModifiers();
      return;
    }

    /* ─── вариант 2: есть активные → перенос ─── */
    store.appliedMods = [...store.activeMods];
    localStorage.setItem('appliedModifiers', JSON.stringify(store.appliedMods));
    renderAppliedModifiers();

    /* очищаем файл active_modifiers.json */
    try {
      await fetch('/api/active_modifiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '[]'
      });
    } catch (err) {
      console.error('Не удалось очистить active_modifiers.json', err);
    }

    /* локально тоже очищаем */
    store.activeMods = [];
    renderActiveModifiers();
  });
});

/* ═════════════ 7. Экспорт для переключения вкладок ═════════════ */
window.renderModifiersTab = () => {
  renderParticipants(store.scores);
  renderActiveModifiers();
  renderAppliedModifiers();
};

/* ═════════════  helpers  ═════════════ */
function el(tagName, className = '') {
  const n = document.createElement(tagName);
  if (className) n.className = className;
  return n;
}
