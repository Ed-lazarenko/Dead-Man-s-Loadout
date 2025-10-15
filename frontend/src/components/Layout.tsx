import TabSystem from './TabSystem'
import type { TabId } from '../types'
import { getActiveTeam } from '../utils'
import { useEffect, useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const [activeTeam, setActiveTeam] = useState<string[]>([])

  useEffect(() => {
    setActiveTeam(getActiveTeam())
  }, [activeTab])

  return (
    <div className="min-h-screen grid" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      {/* Header - fixed height content */}
      <header className="w-full">
        <div className="backdrop-blur-md bg-black/30 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-xl md:text-2xl font-bold">Dead Man's Loadout</h1>
              <div className="hidden md:flex items-center gap-2 text-sm">
                {activeTeam.map((player, index) => (
                  <span key={index} className="font-semibold">
                    {player}
                    {index < activeTeam.length - 1 && <span className="mx-2 text-gray-500">|</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <TabSystem activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          </div>
        </div>
      </header>

      {/* Main - fills remaining space between header and footer */}
      <main>
        {children}
      </main>

      {/* Footer - fixed height content */}
      <footer className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-3 border-t border-white/10 bg-black/10">
          <div className="text-xs md:text-sm text-gray-400">Dead Man's Loadout — experimental UI</div>
        </div>
      </footer>
    </div>
  )
}
