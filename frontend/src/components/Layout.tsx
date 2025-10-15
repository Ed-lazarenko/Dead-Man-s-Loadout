import TabSystem from './TabSystem'
import type { TabId } from '../types'

interface LayoutProps {
  children: React.ReactNode
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 text-white flex flex-col relative overflow-hidden">
      {/* Atmospheric background elements - "Набор мертвеца" */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Fixed Header */}
      <header className="relative bg-dark-800/90 backdrop-blur-md border-b border-primary-500/30 flex-shrink-0 z-10">
        <div className="w-full px-4 py-2">
          {/* Game Title - компактный */}
          <div className="flex justify-center mb-2">
            <h1 className="text-xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-accent">
              Dead Man's Loadout
            </h1>
          </div>
          
          {/* Tab Navigation - на всю ширину */}
          <TabSystem activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </header>

      {/* Main Content - Full Height */}
      <main className="flex-1 overflow-hidden relative z-10">
        <div className="h-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-dark-800/90 backdrop-blur-md border-t border-primary-500/30 flex-shrink-0 z-10">
        <div className="w-full px-4 py-2">
          <div className="text-center text-xs text-gray-400">
            <span className="text-primary-400">Built with ❤️</span>
            <span className="w-1 h-1 bg-primary-500 rounded-full animate-pulse mx-2"></span>
            <span>for Hunt: Showdown community</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
