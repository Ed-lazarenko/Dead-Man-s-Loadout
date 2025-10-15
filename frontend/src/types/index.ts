// Types for Dead Man's Loadout application

export type TabId = 'game' | 'leaderboard' | 'modifiers' | 'controls'

export type LoadoutCellState = 'closed' | 'opened' | 'played'

export interface LoadoutCell {
  image: string
  state: LoadoutCellState
  isMarked: boolean
  playedData?: PlayedCellData
}

export interface PlayedCellData {
  team: string[]
  color: string
  result: number
  penalty: number
}

export interface LoadoutData {
  columns: string[]
  rows: string[]
  cells: LoadoutCell[][]
  marked: number[][] // 1-based coordinates
}

export interface ScoreCalculationData {
  kills: number
  bonus: number
  rewards: number
  penalty: number
  multiplier: number
  cost: number
}

export interface ScoreResult {
  result: number
  penalty: number
}

// Team and Leaderboard types
export interface Team {
  id: string
  players: string[]
  scores: number[]
  penalty: number
  color: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TeamFormData {
  players: string[]
}

export interface ScoreEditData {
  teamId: string
  scoreIndex: number
  value: number
}

export interface PenaltyEditData {
  teamId: string
  penalty: number
}

export type SortField = 'totalScore' | 'bestScore' | 'penalty' | 'players'
export type SortDirection = 'asc' | 'desc'

export interface Modifier {
  name: string
  cost: number
  description: string
  command: string
  maxPerMission: number
  conflicts: string[]
  activated_by?: string
}

export interface ActiveModifier {
  name: string
  description: string
  activated_by: string
  cost?: number
  timestamp?: string
}

export interface Participant {
  current_balance: number
  total_earned: number
  correct_answers: number
  details?: Array<{
    question: string
    earned: number
  }>
}

// UI Component Props
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface PageLayoutProps {
  children: React.ReactNode
  maxWidth?: string
}

export interface LoadoutGridProps {
  className?: string
}

export interface ScoreModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ScoreCalculationData) => void
  rowIndex: number
  colIndex: number
  initialData?: ScoreCalculationData
}
