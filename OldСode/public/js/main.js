document.addEventListener('DOMContentLoaded', () => {
  // переключатель вкладок
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      // Убираем активный класс со всех кнопок и контента
      document
        .querySelectorAll('.tab-button')
        .forEach(b => b.classList.remove('tab-button--active'));
      document
        .querySelectorAll('.tab-content')
        .forEach(tab => tab.classList.remove('tab-content--active'));

      // Добавляем активный класс к выбранной кнопке и контенту
      button.classList.add('tab-button--active');
      document.getElementById(button.dataset.tab).classList.add('tab-content--active');

      // при открытии вкладки «Модификаторы» — загружаем участников,
      // а модификаторы пользователь может подтянуть отдельной кнопкой
      if (button.dataset.tab === 'modifiers') {
        window.renderModifiersTab?.();
      }
    });
  });

  // Устанавливаем неоновую тему по умолчанию
  document.body.className = 'theme-neon';
});
