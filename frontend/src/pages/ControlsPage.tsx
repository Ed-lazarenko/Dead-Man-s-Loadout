import PageLayout from '../components/PageLayout'

export default function ControlsPage() {
  const handleResetActiveTeam = () => {
    localStorage.removeItem('activeTeam')
    alert('Активная команда сброшена. При следующем отыгрыше будет создана новая временная команда.')
  }

  const handleResetLoadoutData = () => {
    // Очищаем все сохраненные отыгранные ячейки
    for (let rowIdx = 0; rowIdx < 5; rowIdx++) {
      for (let colIdx = 0; colIdx < 6; colIdx++) {
        const playedKey = `played-${rowIdx}-${colIdx}`
        localStorage.removeItem(playedKey)
      }
    }
    alert('Все отыгранные ячейки лодаутов сброшены.')
  }

  return (
    <PageLayout>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">⚙️ Управление</h2>
        <p className="text-gray-300 mb-6">
          Здесь будут сервисные функции и управление системой.
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">🎮 Лодауты</h3>
            <p className="text-gray-300 text-sm mb-3">
              Управление данными лодаутов
            </p>
            <button
              onClick={handleResetLoadoutData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Сбросить все отыгранные ячейки
            </button>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">👥 Команды</h3>
            <p className="text-gray-300 text-sm mb-3">
              Управление активной командой
            </p>
            <button
              onClick={handleResetActiveTeam}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors"
            >
              Сбросить активную команду
            </button>
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-400">
              Компонент ControlsPanel будет создан в Этапе 1.6
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
