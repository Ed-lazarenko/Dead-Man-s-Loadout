import LoadoutGrid from '../components/LoadoutGrid'
import { useState, useEffect } from 'react'

export default function GamePage() {
  const [, setActiveTeam] = useState<string[]>([])

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
    <div className="h-full w-full px-4 flex items-center justify-center">
      <LoadoutGrid className="max-h-full" />
    </div>
  )
}
