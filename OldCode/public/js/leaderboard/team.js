/*  js/leaderboard/team.js  — 2025-05-08
 *  управление командами с расширенными логами
 */

console.log('[team.js] загружен');

document.addEventListener('DOMContentLoaded', () => {
  console.log('[team.js] DOM готов');

  /* ——— helper ——— */
  const $  = id => document.getElementById(id);
  const show  = el => { if (el) { el.classList.remove('modal-hidden'); el.style.display = 'flex'; } };
  const hide  = el => { if (el) { el.classList.add   ('modal-hidden'); el.style.display = 'none'; } };

  /* проверка существования хотя бы одной «лебедород»-кнопки */
  if (!$('add-team-button')) {
    console.warn('[team.js] элементов лидерборда не найдено — выходим');
    return;
  }

  /* ========= ДОБАВИТЬ КОМАНДУ ========= */
  const modalAdd = $('leaderboard-modal');

  $('add-team-button')?.addEventListener('click', () => {
    console.log('[add] click');
    show(modalAdd);
  });

  $('cancel-team')?.addEventListener('click', () => {
    console.log('[add] cancel');
    hide(modalAdd);
  });

  $('save-team')?.addEventListener('click', () => {
    const players = ['player1','player2','player3']
      .map(id => $(id)?.value.trim())
      .filter(Boolean);

    console.log('[add] save', players);

    if (!players.length) return;

    const color = genColor(players);
    window.leaderboardData.push({ players, scores: [], penalty: 0, color });
    localStorage.setItem('leaderboardData', JSON.stringify(window.leaderboardData));

    ['player1','player2','player3'].forEach(id => { if ($(id)) $(id).value = ''; });
    hide(modalAdd);
    window.createLeaderboard?.();
  });

  /* ========= УДАЛИТЬ КОМАНДУ ========= */
  const modalRem = $('remove-team-modal');
  const selRem   = $('team-select');

  $('remove-team-button')?.addEventListener('click', () => {
    if (!modalRem || !selRem) return;
    selRem.innerHTML = '';
    window.leaderboardData.forEach((t, i) =>
      selRem.insertAdjacentHTML('beforeend',
        `<option value="${i}">${t.players.join(' / ')}</option>`));
    console.log('[remove] open list');
    show(modalRem);
  });

  $('cancel-remove')?.addEventListener('click', () => {
    console.log('[remove] cancel');
    hide(modalRem);
  });

  $('confirm-remove')?.addEventListener('click', () => {
    const idx = parseInt(selRem?.value ?? '', 10);
    console.log('[remove] confirm idx', idx);
    if (Number.isInteger(idx)) {
      window.leaderboardData.splice(idx, 1);
      localStorage.setItem('leaderboardData', JSON.stringify(window.leaderboardData));
      hide(modalRem);
      window.createLeaderboard?.();
    }
  });

  /* ========= ВЫБРАТЬ АКТИВНУЮ ========= */
  const modalChoose = $('choose-active-team-modal');
  const selChoose   = $('choose-active-team-select');

  $('choose-active-team-button')?.addEventListener('click', () => {
    if (!modalChoose || !selChoose) return;
    selChoose.innerHTML = '';
    window.leaderboardData.forEach(t =>
      selChoose.insertAdjacentHTML('beforeend',
        `<option value='${JSON.stringify(t.players)}'>${t.players.join(' / ')}</option>`));
    console.log('[choose] open');
    show(modalChoose);
  });

  $('cancel-active-team')?.addEventListener('click', () => {
    console.log('[choose] cancel');
    hide(modalChoose);
  });

  $('confirm-active-team')?.addEventListener('click', () => {
    localStorage.setItem('activeTeam', selChoose?.value ?? '[]');
    console.log('[choose] selected', selChoose?.value);
    hide(modalChoose);
    window.createLeaderboard?.();
    window.updateActiveTeamDisplay?.();
  });

  /* ========= ДОБАВИТЬ ИГРУ ========= */
  $('add-game-button')?.addEventListener('click', () => {
    window.leaderboardData.forEach(t => t.scores.push(''));
    localStorage.setItem('leaderboardData', JSON.stringify(window.leaderboardData));
    console.log('[add-game] новая колонка игр');
    window.createLeaderboard?.();
  });

});

/* ─── утилита цвета ─── */
function genColor(arr){
  const str = arr.slice().sort().join(',').toLowerCase();
  let h = 0;
  for (let i = 0; i < str.length; i++)
    h = str.charCodeAt(i) + ((h << 5) - h);
  return `hsl(${Math.abs(h)%360},65%,30%)`;
}
