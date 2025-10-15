import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-400">
          Dead Man's Loadout
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          React + TypeScript + Vite + Tailwind CSS
        </p>
        <div className="space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            🎮 Игра
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            🏆 Лидерборд
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            🧪 Модификаторы
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            ⚙️ Управление
          </button>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          ✅ Все зависимости установлены и работают!
        </p>
      </div>
    </div>
  )
}

export default App
