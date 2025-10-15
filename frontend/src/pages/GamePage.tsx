import LoadoutGrid from '../components/LoadoutGrid'
import { useState, useEffect } from 'react'

export default function GamePage() {
  const [activeTeam, setActiveTeam] = useState<string[]>([])

  // Загружаем активную команду при инициализации
  useEffect(() => {
    const activeTeamJSON = localStorage.getItem('activeTeam')
    let team = activeTeamJSON ? JSON.parse(activeTeamJSON) : []
    
    // Заглушка: если нет активной команды, создаем временную
    if (!team.length) {
      team = ['Игрок 1', 'Игрок 2', 'Игрок 3']
      localStorage.setItem('activeTeam', JSON.stringify(team))
    }
    
    setActiveTeam(team)
  }, [])

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Отображение активной команды */}
        <div className="mb-6">
          <div className="bg-dark-800 rounded-lg p-4 border border-primary-500/30">
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary-400 font-semibold">Активная команда:</span>
              <div className="flex items-center gap-2">
                {activeTeam.map((player, index) => (
                  <span 
                    key={index}
                    className={`font-bold ${
                      index === 0 ? 'text-warning' :
                      index === 1 ? 'text-success' : 
                      'text-accent'
                    }`}
                  >
                    {player}
                  </span>
                ))}
                {activeTeam.length > 1 && activeTeam.map((_, index) => 
                  index < activeTeam.length - 1 && (
                    <span key={`pipe-${index}`} className="text-gray-500">|</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Сетка лодаутов - полноэкранный контент */}
        <LoadoutGrid className="h-full w-full" />
      </div>
    </div>
  )
}
