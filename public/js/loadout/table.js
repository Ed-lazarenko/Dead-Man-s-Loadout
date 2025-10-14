/* ==========================================================
   Создание таблицы лодаутов
   • поддержка «marked» карточек (loadoutData.marked)
   • бейдж метки, если указан stored.label  или  карточка в marked[]
   • ПКМ:
       – на закрытой  →  window.openLabelModal
       – на открытой  →  window.openScoreModal
   ========================================================== */
window.createLoadoutTable = function (data) {
  const area = document.getElementById('loadout-area');
  const table = document.createElement('table');
  table.className = 'loadout-table';

  window.updateActiveTeamDisplay();

  /* ---------- шапка --------- */
  const headerRow = document.createElement('tr');
  const cornerCell = document.createElement('th');
  cornerCell.className = 'corner-cell';
  cornerCell.textContent = '💀';
  headerRow.appendChild(cornerCell);

  data.columns.forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  /* ---------- тело --------- */
  data.rows.forEach((label, rowIdx) => {
    const row = document.createElement('tr');

    const th = document.createElement('th');
    th.textContent = label;
    row.appendChild(th);

    data.cells[rowIdx].forEach((cell, colIdx) => {
      const td = document.createElement('td');
      td.className = 'loadout-cell closed';

      /* ─── сохранённое состояние карточки ─── */
      const playedKey = `played-${rowIdx}-${colIdx}`;
      const raw = localStorage.getItem(playedKey);
      let stored = {};
      if (raw) {
        try { stored = JSON.parse(raw) || {}; } catch { localStorage.removeItem(playedKey); }
      }

      /* если карточка была сыграна */
      if (stored.team) {
        td.classList.remove('closed');
        td.classList.add('opened', 'played');
      }

      /* ─── картинка ─── */
      const img = document.createElement('img');
      img.src = cell.image;
      img.alt = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';
      wrapper.appendChild(img);
      td.appendChild(wrapper);

      /* цвет рамки по цвету команды */
      if (stored.color) {
        wrapper.style.border = `3px solid ${stored.color}`;
        wrapper.style.borderRadius = '2px';
        wrapper.style.boxShadow = `0 0 10px 2px ${stored.color}`;
      }

      // ── бейдж «пометка» для закрытых карточек
      // ВАЖНО: data.marked теперь 1-based: [ [1,1], [2,3], ... ]
      const isMarked = (data.marked || []).some(
        ([r, c]) => (r - 1) === rowIdx && (c - 1) === colIdx
      );
      if (isMarked && !td.classList.contains('played')) {
        const badge = document.createElement('span');
        badge.className = 'loadout-label-badge';
        badge.textContent = '★';
        td.appendChild(badge);
      }

      /* ─── overlay «Отыграно» ─── */
      const overlay = document.createElement('div');
      overlay.className = 'played-overlay';

      if (stored.result != null || stored.penalty) {
        const scoreNote = document.createElement('div');
        scoreNote.className = 'played-score-note';
        if (stored.penalty > 0) {
          scoreNote.textContent = `−${stored.penalty}`;
          scoreNote.style.color = '#ff5555';
        } else {
          scoreNote.textContent = `+${stored.result}`;
        }
        overlay.appendChild(scoreNote);
      }

      if (stored.team?.length) {
        const teamHTML =
          '<div class="played-team">' +
          stored.team.map((n, i) =>
            `<span class="played-name played-name-${(i % 3) + 1}">${n}</span>`
          ).join('') +
          '</div>';
        overlay.innerHTML += `<span class="played-text">Отыграно</span>${teamHTML}`;
      }

      td.appendChild(overlay);

      /* ─── левый клик ─── */
      td.addEventListener('click', e => {
        if (e.button !== 0) return;
        if (td.classList.contains('closed')) {
          td.classList.remove('closed');
          td.classList.add('opened');
        } else {
          window.openModal(img.src);
        }
      });

      /* ─── правый клик ─── */
      td.addEventListener('contextmenu', e => {
        e.preventDefault();
        if (td.classList.contains('closed')) {
          /* добавить / изменить метку */
          window.openLabelModal?.(td, rowIdx, colIdx);
        } else {
          /* открыть окно расчёта очков */
          window.openScoreModal?.(td, rowIdx, colIdx, label);
        }
      });

      row.appendChild(td);
    });

    table.appendChild(row);
  });

  area.innerHTML = '';
  area.appendChild(table);
  window.updateLoadoutCounter();
};

/* ==========================================================
   Служебные счётчики / активная команда
   ========================================================== */

window.updateLoadoutCounter = function () {
  const count = document.querySelectorAll('.loadout-cell.played').length;
  const counter = document.getElementById('controls-counter');
  if (counter) counter.textContent = `Отыграно: ${count}`;
};

window.updateActiveTeamDisplay = function () {
  const container = document.getElementById('active-team-display');
  if (!container) return;

  const raw = localStorage.getItem('activeTeam');
  if (!raw) {
    container.innerHTML = '<div class="active-team-box">Нет активной команды</div>';
    return;
  }

  try {
    const team = JSON.parse(raw);
    const namesHTML = team.map((n, i) =>
      `<span class="active-player player-${(i % 3) + 1}">${n}</span>`
    ).join('<span class="pipe"> | </span>');

    container.innerHTML = `
      <div class="active-team-box">
        <span class="active-team-title">Активная команда:</span>
        <span class="active-team-names">${namesHTML}</span>
      </div>`;
  } catch {
    container.innerHTML = '<div class="active-team-box">Нет активной команды</div>';
  }
};
