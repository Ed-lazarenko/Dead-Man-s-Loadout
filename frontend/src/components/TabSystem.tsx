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
    <div>
      <div>
        <nav>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => onTabChange(tab.id)}>
              <span>{tab.icon}</span> <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
