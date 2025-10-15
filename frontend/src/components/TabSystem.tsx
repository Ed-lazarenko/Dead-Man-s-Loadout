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
    <div className="relative w-full">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-primary-400/20 to-accent/10 rounded-xl blur-sm"></div>
      
      {/* Tab container - на всю ширину */}
      <div className="relative bg-dark-800/90 backdrop-blur-md rounded-xl p-1 border border-primary-500/30 shadow-glow mx-5">
        <nav className="flex w-full gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ease-out
                group overflow-hidden
                ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent text-dark-900 shadow-neon transform scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700/50 hover:scale-105'
                }
              `}
            >
              {/* Active tab background effect */}
              {activeTab === tab.id && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent/20 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent rounded-lg opacity-90"></div>
                </>
              )}
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center space-x-1">
                <span className={`text-sm transition-transform duration-300 ${
                  activeTab === tab.id ? 'animate-bounce-slow' : 'group-hover:scale-110'
                }`}>
                  {tab.icon}
                </span>
                <span className="font-semibold tracking-wide text-xs">
                  {tab.label}
                </span>
              </div>
              
              {/* Active indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-dark-900 rounded-full"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
