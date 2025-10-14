/*  js/leaderboard/score‑edit.js
 *  ─────────────────────────────────────────────────────────
 *  Правка отдельного значения очков по правому клику
 *  (модалка #edit-score-modal)
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal        = document.getElementById('edit-score-modal');
  const input        = document.getElementById('score-input');
  const btnSave      = document.getElementById('save-edit-score');
  const btnCancel    = document.getElementById('cancel-edit-score');

  /* если на странице нет нужных элементов (другая вкладка) — тихо выходим */
  if (!modal || !input || !btnSave || !btnCancel) return;

  /* сохраняем, какая ячейка сейчас редактируется */
  window.editingScoreContext = null;

  /* глобальная функция: вызывается при открытии модалки */
  window.openScoreEditModal = function (teamIndex, scoreIndex, currentVal) {
    input.value = currentVal;
    window.editingScoreContext = { teamIndex, scoreIndex };
    modal.classList.remove('leaderboard-hidden');
    input.focus();
  };

  /* ─── подтверждение ─── */
  btnSave.onclick = () => {
    const newVal = parseInt(input.value);
    if (isNaN(newVal)) return;

    const { teamIndex, scoreIndex } = window.editingScoreContext || {};
    if (teamIndex == null || scoreIndex == null) return;

    window.leaderboardData[teamIndex].scores[scoreIndex] = newVal;
    localStorage.setItem('leaderboardData',
                         JSON.stringify(window.leaderboardData));

    window.createLeaderboard?.();
    modal.classList.add('leaderboard-hidden');
  };

  /* ─── отмена ─── */
  btnCancel.onclick = () =>
    modal.classList.add('leaderboard-hidden');
});
