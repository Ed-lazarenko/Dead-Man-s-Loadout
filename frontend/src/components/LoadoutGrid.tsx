import { useState, useCallback } from 'react'
import { useLoadoutData } from '../hooks/useLoadoutData'
import ScoreModal, { type ScoreCalculationData } from './ScoreModal'
import type { LoadoutGridProps, PlayedCellData, LoadoutCell } from '../types'
import { UI_CONFIG, TEAM_COLORS } from '../constants'
import { 
  getActiveTeam, 
  saveActiveTeam, 
  calculateScoreResult, 
  formatNumber
} from '../utils'
import { debugLog } from '../utils'

export default function LoadoutGrid({ className = '' }: LoadoutGridProps) {
  const { data, updateCellState, markCellAsPlayed } = useLoadoutData()
  // Убрали полноэкранную модалку изображения
  const gridGap = 16 // gap-4 = 1rem ~ 16px
  const [scoreModal, setScoreModal] = useState<{
    isOpen: boolean
    rowIdx: number
    colIdx: number
    cost: number
  }>({
    isOpen: false,
    rowIdx: -1,
    colIdx: -1,
    cost: 0
  })

  const handleCellClick = useCallback((cell: LoadoutCell, rowIdx: number, colIdx: number) => {
    if (cell.state === 'closed') {
      updateCellState(rowIdx, colIdx, 'opened')
    }
  }, [updateCellState])

  const handleCellRightClick = useCallback((cell: LoadoutCell, rowIdx: number, colIdx: number, cost: number) => {
    if (cell.state === 'closed') {
      debugLog('Add label modal for', rowIdx, colIdx)
    } else if (cell.state === 'opened') {
      setScoreModal({
        isOpen: true,
        rowIdx,
        colIdx,
        cost
      })
    }
  }, [])

  const handleScoreSave = useCallback((scoreData: ScoreCalculationData) => {
    const { kills, bonus, rewards, penalty, multiplier, cost } = scoreData
    
    // Расчет результата по формуле
    const { result, penalty: finalPenalty } = calculateScoreResult({
      kills,
      bonus,
      rewards,
      penalty,
      multiplier,
      cost
    })

    // Получаем активную команду
    let team = getActiveTeam()
    
    // Заглушка: если нет активной команды, создаем временную
    if (!team.length) {
      team = ['Игрок 1', 'Игрок 2', 'Игрок 3']
      saveActiveTeam(team)
      debugLog('Created temporary team:', team)
    }

    // Создаем данные для отображения
    const playedData: PlayedCellData = {
      team,
      color: TEAM_COLORS.PRIMARY,
      result: formatNumber(result),
      penalty: formatNumber(finalPenalty)
    }

    markCellAsPlayed(scoreModal.rowIdx, scoreModal.colIdx, playedData)
    setScoreModal({ isOpen: false, rowIdx: -1, colIdx: -1, cost: 0 })
  }, [scoreModal, markCellAsPlayed])

  // Инициализация: без дополнительных слушателей, размеры таблицы фиксированы по трекам

  return (
    <div className={className}>
      {/* Сетка без лишних оберток */}
      <div 
        className="grid"
        style={{
          gap: `${gridGap}px`,
          gridTemplateColumns: `${UI_CONFIG.GRID_CELL_SIZE.HEADER_WIDTH}px repeat(6, ${UI_CONFIG.GRID_CELL_SIZE.CELL_WIDTH}px)`,
          gridTemplateRows: `${UI_CONFIG.GRID_CELL_SIZE.HEADER_HEIGHT}px repeat(5, ${UI_CONFIG.GRID_CELL_SIZE.CELL_HEIGHT}px)`
        }}
      >
              {/* Заголовок */}
              <div className="border border-white/15 rounded-md flex items-center justify-center bg-black/20">
                <span className="text-2xl">💀</span>
              </div>
              
              {/* Колонки */}
              {data.columns.map((column, idx) => (
            <div key={idx} className="border border-white/15 rounded-md flex items-center justify-center bg-black/20">
                  <span className="font-semibold text-sm">{column}</span>
                </div>
              ))}

              {/* Строки */}
              {data.cells.map((row, rowIdx) => {
                const rowLabel = data.rows[rowIdx]
                const cost = parseInt(rowLabel)
                
                return [
                  // Заголовок строки
              <div key={`row-${rowIdx}`} className="border border-white/15 rounded-md flex items-center justify-center bg-black/20">
                    <span className="font-semibold text-sm">{rowLabel}</span>
                  </div>,
                  // Ячейки строки
                  ...row.map((cell, colIdx) => {
                    // const isMarked = isCellMarked(rowIdx, colIdx, data.marked)
                    
                    return (
                      <div
                        key={`cell-${rowIdx}-${colIdx}`}
                        className="relative border border-white/15 rounded-md overflow-hidden bg-black/20 flex items-center justify-center"
                        onClick={() => handleCellClick(cell, rowIdx, colIdx)}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          handleCellRightClick(cell, rowIdx, colIdx, cost)
                        }}
                      >
                        {/* Изображение - оптимизировано для прямоугольных картинок */}
                        {cell.state !== 'closed' && (
                          <img
                            src={cell.image}
                            alt=""
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              debugLog('Failed to load image:', cell.image)
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        
                        {/* Закрытая карточка */}
                        {cell.state === 'closed' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-md border border-white/20 bg-black/40 flex items-center justify-center text-2xl">?
                            </div>
                          </div>
                        )}

                        {/* Пометки временно отключены */}

                        {/* Overlay для отыгранных */}
                        {cell.state === 'played' && cell.playedData && (
                          <div className="absolute inset-0 bg-black/60 text-white flex flex-col items-center justify-center gap-1">
                            <div className="text-lg font-bold">
                              {cell.playedData.penalty > 0 
                                ? `−${cell.playedData.penalty}` 
                                : `+${cell.playedData.result}`
                              }
                            </div>
                            <div className="text-xs uppercase tracking-wider opacity-80">Отыграно</div>
                          </div>
                        )}
                      </div>
                    )
                  })
                ]
              }).flat()}
      </div>

      {/* Полноэкранная модалка изображения временно отключена */}

      {/* Модалка расчета очков */}
      <ScoreModal
        isOpen={scoreModal.isOpen}
        onClose={() => setScoreModal({ isOpen: false, rowIdx: -1, colIdx: -1, cost: 0 })}
        onSave={handleScoreSave}
        rowIndex={scoreModal.rowIdx}
        colIndex={scoreModal.colIdx}
        initialData={{
          kills: 0,
          bonus: 0,
          rewards: 0,
          penalty: 0,
          multiplier: 1,
          cost: scoreModal.cost
        }}
      />
    </div>
  )
}