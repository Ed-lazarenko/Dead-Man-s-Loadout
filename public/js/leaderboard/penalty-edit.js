/*  js/leaderboard/penalty‑edit.js
 *  ─────────────────────────────────────────────────────────
 *  Редактирование штрафа по правому клику на ячейке «Штраф»
 *  (модалка #edit-penalty-modal)
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal     = document.getElementById('edit-penalty-modal');
  const input     = document.getElementById('penalty-input');
  const saveBtn   = document.getElementById('save-edit-penalty');
  const cancelBtn = document.getElementById('cancel-edit-penalty');

  /* если нужных элементов нет — тихо выходим */
  if (!modal || !input || !saveBtn || !cancelBtn) return;

  let editingIndex = null;      // индекс команды, чьё значение редактируем

  /* глобальная функция — вызывает модалку */
  window.openPenaltyEditModal = function (teamIndex, currentValue = 0) {
    editingIndex = teamIndex;
    input.value  = currentValue ?? 0;
    modal.classList.remove('leaderboard-hidden');
    input.focus();
  };

  /* ─── сохранить ─── */
  saveBtn.onclick = () => {
    const newValue = parseInt(input.value, 10) || 0;
    if (editingIndex == null) return;

    window.leaderboardData[editingIndex].penalty = newValue;
    localStorage.setItem('leaderboardData',
                         JSON.stringify(window.leaderboardData));

    window.createLeaderboard?.();
    modal.classList.add('leaderboard-hidden');
  };

  /* ─── отмена ─── */
  cancelBtn.onclick = () =>
    modal.classList.add('leaderboard-hidden');
});
