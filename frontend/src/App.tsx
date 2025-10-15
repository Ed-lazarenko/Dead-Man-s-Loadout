import { useState } from 'react'
import Layout from './components/Layout'
import GamePage from './pages/GamePage'
import LeaderboardPage from './pages/LeaderboardPage'
import ModifiersPage from './pages/ModifiersPage'
import ControlsPage from './pages/ControlsPage'
import type { TabId } from './types'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('game')

  const renderPage = () => {
    switch (activeTab) {
      case 'game':
        return <GamePage />
      case 'leaderboard':
        return <LeaderboardPage />
      case 'modifiers':
        return <ModifiersPage />
      case 'controls':
        return <ControlsPage />
      default:
        return <GamePage />
    }
  }

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </Layout>
  )
}

export default App