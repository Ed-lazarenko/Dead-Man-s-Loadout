export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">🏆 Лидерборд</h2>
        <p className="text-gray-300">
          Здесь будет таблица команд с очками, штрафами и управлением.
        </p>
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-400">
            Компонент LeaderboardTable будет создан в Этапе 1.4
          </p>
        </div>
      </div>
    </div>
  )
}
