/*  js/loadout/score.js
 *  ─────────────────────────────────────────────────────────
 *  Модалка расчёта очков с «дополнительным штрафом».
 *
 *  ▸ Если kills = 0 и rewards = 0
 *      penalty = (cost + extraPenalty) × multiplier
 *      result  = 0
 *  ▸ Иначе
 *      result  = ((cost*kills) + (bonus*kills) +
 *                 (rewards * ((cost+bonus)/2))) × multiplier
 *      penalty = extraPenalty × multiplier
 *
 *  В лидерборд заносим:
 *      +result  либо  –penalty
 */

window.openScoreModal = function (td, rowIdx, colIdx, costLabel) {
  const modal = document.getElementById('loadout-score-modal');
  modal.classList.remove('loadout-score-hidden');

  const form = modal.querySelector('form');
  form.reset();

  /* ───────── submit ───────── */
  form.onsubmit = (e) => {
    e.preventDefault();

    /* данные формы */
    const kills = parseInt(form.kills.value) || 0;
    const bonus = parseInt(form.bonus.value) || 0;
    const rewards = parseInt(form.rewards.value) || 0;
    const extraRaw = parseInt(form.penalty.value) || 0;   // «доп. штраф»
    const multiplier = parseFloat(form.multiplier.value) || 1;

    const cost = parseInt(costLabel.split(' ')[0]) || 0;

    /* расчёт очков / штрафа */
    let result = 0;
    let adjustedPenalty = 0;

    if (kills === 0 && rewards === 0) {
      adjustedPenalty = Math.round((cost + extraRaw) * multiplier);
    } else {
      const baseScore =
        (cost * kills) +
        (bonus * kills) +
        (rewards * ((cost + bonus) / 2));

      result = Math.round(baseScore * multiplier);
      adjustedPenalty = Math.round(extraRaw * multiplier);
    }

    /* ─── активная команда ─── */
    const activeTeamJSON = localStorage.getItem('activeTeam');
    const team = activeTeamJSON ? JSON.parse(activeTeamJSON) : [];
    if (!team.length) { alert('Нет активной команды!'); return; }

    const entry = window.leaderboardData.find(
      t => JSON.stringify(t.players) === JSON.stringify(team)
    );
    const teamColor = entry?.color || 'transparent';

    /* ─── сохраняем ячейку ─── */
    const playedKey = `played-${rowIdx}-${colIdx}`;
    localStorage.setItem(playedKey, JSON.stringify({
      team,
      color: teamColor,
      result,
      penalty: adjustedPenalty
      // label намеренно НЕ пишем, чтобы она исчезла
    }));

    // если была пометка — убираем бейдж и чистим запись из data.marked (1-based)
    const b = td.querySelector('.loadout-label-badge');
    if (b) b.remove();
    if (Array.isArray(window.loadoutData?.marked)) {
      window.loadoutData.marked = window.loadoutData.marked.filter(
        ([r, c]) => !((r - 1) === rowIdx && (c - 1) === colIdx)
      );
    }

    /* ─── оформление клетки ─── */
    td.classList.add('played');
    const imgWrap = td.querySelector('.image-wrapper');
    if (imgWrap) {
      imgWrap.style.border = `3px solid ${teamColor}`;
      imgWrap.style.borderRadius = '2px';
      imgWrap.style.boxShadow = `0 0 10px 2px ${teamColor}`;
    }

    const overlay = td.querySelector('.played-overlay');
    const isPenalty = adjustedPenalty > 0;
    const noteText = isPenalty ? `−${adjustedPenalty}` : `+${result}`;
    const noteColor = isPenalty ? '#ff5555' : '#00ff68';

    overlay.innerHTML = `
      <div class="played-score-note" style="color:${noteColor};">${noteText}</div>
      <span class="played-text">Отыграно</span>
      <div class="played-team">
        ${team.map(
      (n, i) => `<span class="played-name played-name-${(i % 3) + 1}">${n}</span>`
    ).join('')}
      </div>`;

    /* ─── заносим итог в лидерборд ─── */
    if (entry) {
      const valueForBoard = isPenalty ? -adjustedPenalty : result;

      const idx = entry.scores.findIndex(s => s === '' || s == null);
      if (idx !== -1) entry.scores[idx] = valueForBoard;
      else entry.scores.push(valueForBoard);

      entry.penalty = (entry.penalty || 0) + adjustedPenalty;

      localStorage.setItem('leaderboardData', JSON.stringify(window.leaderboardData));
      window.createLeaderboard?.();
    }

    modal.classList.add('loadout-score-hidden');
    window.updateLoadoutCounter();
  };

  /* ───────── cancel ───────── */
  document.getElementById('loadout-cancel-score').onclick = () =>
    modal.classList.add('loadout-score-hidden');
};
