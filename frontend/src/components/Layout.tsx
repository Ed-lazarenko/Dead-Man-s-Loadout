import TabSystem from './TabSystem'
import type { TabId } from '../types'

interface LayoutProps {
  children: React.ReactNode
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Fixed Header */}
      <header className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="w-full px-4 py-4">
          {/* Tab Navigation - в самом верху по центру */}
          <div className="flex justify-center mb-4">
            <TabSystem activeTab={activeTab} onTabChange={onTabChange} />
          </div>
          
          {/* Game Title - под вкладками по центру */}
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-white font-cinzel">
              Dead Man's Loadout
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content - Full Height */}
      <main className="flex-1 overflow-hidden">
        <div className="w-full h-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 flex-shrink-0">
        <div className="w-full px-4 py-2">
          <div className="text-center text-sm text-gray-400">
            <p>Built with ❤️ for Hunt: Showdown community</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
