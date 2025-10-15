import { useState, useEffect, useCallback } from 'react'
import type { LoadoutData, LoadoutCellState, PlayedCellData } from '../types'
import { LOADOUT_CONFIG } from '../constants'
import { 
  getPlayedCellData, 
  savePlayedCellData, 
  clearAllPlayedCells,
  isCellMarked,
  createInitialCell 
} from '../utils'

const createInitialLoadoutData = (): LoadoutData => ({
  columns: LOADOUT_CONFIG.COLUMN_LABELS,
  rows: LOADOUT_CONFIG.ROW_LABELS,
  cells: Array.from({ length: LOADOUT_CONFIG.ROWS }, (_, row) =>
    Array.from({ length: LOADOUT_CONFIG.COLS }, (_, col) => 
      createInitialCell(row, col)
    )
  ),
  marked: LOADOUT_CONFIG.MARKED_CELLS
})

export function useLoadoutData() {
  const [data, setData] = useState<LoadoutData>(createInitialLoadoutData)

  // Загружаем только отыгранные ячейки при инициализации
  useEffect(() => {
    const loadedData = createInitialLoadoutData()
    
    // Загружаем отыгранные ячейки из localStorage
    for (let rowIdx = 0; rowIdx < LOADOUT_CONFIG.ROWS; rowIdx++) {
      for (let colIdx = 0; colIdx < LOADOUT_CONFIG.COLS; colIdx++) {
        const playedData = getPlayedCellData(rowIdx, colIdx)
        
        if (playedData && typeof playedData === 'object' && 'team' in playedData) {
          loadedData.cells[rowIdx][colIdx] = {
            ...loadedData.cells[rowIdx][colIdx],
            state: 'played',
            playedData: {
              team: playedData.team as string[],
              color: playedData.color as string,
              result: (playedData.result as number) || 0,
              penalty: (playedData.penalty as number) || 0
            }
          }
        }
      }
    }
    
    setData(loadedData)
    console.log('Loaded played cells from localStorage')
  }, [])

  const updateCellState = useCallback((rowIdx: number, colIdx: number, state: LoadoutCellState) => {
    console.log(`Updating cell [${rowIdx}, ${colIdx}] to state: ${state}`)
    setData(prev => ({
      ...prev,
      cells: prev.cells.map((row, rIdx) =>
        rIdx === rowIdx
          ? row.map((cell, cIdx) =>
              cIdx === colIdx ? { ...cell, state } : cell
            )
          : row
      )
    }))
  }, [])

  const markCellAsPlayed = useCallback((rowIdx: number, colIdx: number, playedData: PlayedCellData) => {
    // Сохраняем в localStorage
    savePlayedCellData(rowIdx, colIdx, playedData)

    setData(prev => ({
      ...prev,
      cells: prev.cells.map((row, rIdx) =>
        rIdx === rowIdx
          ? row.map((cell, cIdx) =>
              cIdx === colIdx 
                ? { ...cell, state: 'played' as LoadoutCellState, playedData }
                : cell
            )
          : row
      ),
      // Убираем из marked если была пометка
      marked: prev.marked.filter(([r, c]) => !isCellMarked(rowIdx, colIdx, [[r, c]]))
    }))
    
    console.log(`Saved played cell [${rowIdx}, ${colIdx}] to localStorage`)
  }, [])

  const getPlayedCount = useCallback(() => {
    return data.cells.flat().filter(cell => cell.state === 'played').length
  }, [data.cells])

  const resetData = useCallback(() => {
    clearAllPlayedCells()
    setData(createInitialLoadoutData())
    console.log('Reset all loadout data and cleared localStorage')
  }, [])

  return {
    data,
    updateCellState,
    markCellAsPlayed,
    getPlayedCount,
    resetData
  }
}
