import type { TabId } from '../types'

interface Tab {
  id: TabId
  label: string
  icon: string
}

interface TabSystemProps {
  activeTab: TabId
  onTabChange: (tabId: TabId) => void
}

const tabs: Tab[] = [
  { id: 'game', label: 'Игра', icon: '🎮' },
  { id: 'leaderboard', label: 'Лидерборд', icon: '🏆' },
  { id: 'modifiers', label: 'Модификаторы', icon: '🧪' },
  { id: 'controls', label: 'Управление', icon: '⚙️' },
]

export default function TabSystem({ activeTab, onTabChange }: TabSystemProps) {
  return (
    <div className="bg-gray-700 rounded-lg p-1">
      <nav className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                activeTab === tab.id
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-600'
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
