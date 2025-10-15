export default function GamePage() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">🎮 Игра - Лодауты</h2>
        <p className="text-gray-300">
          Здесь будет сетка 5×6 с карточками снаряжения Hunt: Showdown.
        </p>
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-400">
            Компонент LoadoutGrid будет создан в Этапе 1.3
          </p>
        </div>
      </div>
    </div>
  )
}
