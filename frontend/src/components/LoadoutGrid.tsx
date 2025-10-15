import { useState, useCallback } from 'react'
import { useLoadoutData } from '../hooks/useLoadoutData'
import Modal from './Modal'
import ScoreModal, { type ScoreCalculationData } from './ScoreModal'
import type { LoadoutGridProps, PlayedCellData } from '../types'
import { UI_CONFIG, TEAM_COLORS } from '../constants'
import { 
  getActiveTeam, 
  saveActiveTeam, 
  calculateScoreResult, 
  formatNumber,
  isCellMarked 
} from '../utils'

export default function LoadoutGrid({ className = '' }: LoadoutGridProps) {
  const { data, updateCellState, markCellAsPlayed } = useLoadoutData()
  const [modalImage, setModalImage] = useState<string | null>(null)
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

  const handleCellClick = useCallback((cell: any, rowIdx: number, colIdx: number) => {
    if (cell.state === 'closed') {
      updateCellState(rowIdx, colIdx, 'opened')
    } else if (cell.state === 'opened') {
      setModalImage(cell.image)
    }
  }, [updateCellState])

  const handleCellRightClick = useCallback((cell: any, rowIdx: number, colIdx: number, cost: number) => {
    if (cell.state === 'closed') {
      console.log('Add label modal for', rowIdx, colIdx)
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
      console.log('Created temporary team:', team)
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

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {/* Таблица лодаутов - CSS Grid с фиксированными размерами */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div 
          className="grid gap-2"
          style={{
            gridTemplateColumns: `${UI_CONFIG.GRID_CELL_SIZE.HEADER_WIDTH}px repeat(6, ${UI_CONFIG.GRID_CELL_SIZE.CELL_WIDTH}px)`,
            gridTemplateRows: `${UI_CONFIG.GRID_CELL_SIZE.HEADER_HEIGHT}px repeat(5, ${UI_CONFIG.GRID_CELL_SIZE.CELL_HEIGHT}px)`
          }}
        >
          {/* Заголовок */}
          <div className="bg-gray-700 text-white text-center font-bold border-2 border-gray-600 flex items-center justify-center">
            💀
          </div>
          
          {/* Колонки */}
          {data.columns.map((column, idx) => (
            <div key={idx} className="bg-gray-700 text-white text-center font-bold text-lg border-2 border-gray-600 flex items-center justify-center">
              {column}
            </div>
          ))}

          {/* Строки */}
          {data.cells.map((row, rowIdx) => {
            const rowLabel = data.rows[rowIdx]
            const cost = parseInt(rowLabel)
            
            return [
              // Заголовок строки
              <div key={`row-${rowIdx}`} className="bg-gray-700 text-white text-center font-semibold text-sm border-2 border-gray-600 flex items-center justify-center">
                {rowLabel}
              </div>,
              // Ячейки строки
              ...row.map((cell, colIdx) => {
                const isMarked = isCellMarked(rowIdx, colIdx, data.marked)
                
                return (
                  <div
                    key={`cell-${rowIdx}-${colIdx}`}
                    className={`
                      relative border-2 border-gray-600 cursor-pointer transition-colors
                      ${cell.state === 'closed' ? 'bg-gray-900' : ''}
                      ${cell.state === 'opened' ? 'bg-gray-700' : ''}
                      ${cell.state === 'played' ? 'bg-gray-600' : ''}
                      hover:bg-gray-600
                      flex items-center justify-center
                      overflow-hidden
                    `}
                    onClick={() => handleCellClick(cell, rowIdx, colIdx)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      handleCellRightClick(cell, rowIdx, colIdx, cost)
                    }}
                  >
                    {/* Изображение */}
                    {cell.state !== 'closed' && (
                      <img
                        src={cell.image}
                        alt=""
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          console.error('Failed to load image:', cell.image)
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                    
                    {/* Закрытая карточка */}
                    {cell.state === 'closed' && (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl">?</span>
                      </div>
                    )}

                    {/* Пометка ★ */}
                    {isMarked && cell.state !== 'played' && (
                      <div className="absolute top-1 right-1 text-yellow-400 text-lg font-bold z-10">
                        ★
                      </div>
                    )}

                    {/* Overlay для отыгранных */}
                    {cell.state === 'played' && cell.playedData && (
                      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center text-white text-xs">
                        <div className={`font-bold ${
                          cell.playedData.penalty > 0 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {cell.playedData.penalty > 0 
                            ? `−${cell.playedData.penalty}` 
                            : `+${cell.playedData.result}`
                          }
                        </div>
                        <div className="text-xs">Отыграно</div>
                      </div>
                    )}
                  </div>
                )
              })
            ]
          }).flat()}
        </div>
      </div>

      {/* Модалка полноэкранного изображения */}
      <Modal
        isOpen={modalImage !== null}
        onClose={() => setModalImage(null)}
        title="Изображение"
        size="xl"
      >
        {modalImage && (
          <div className="flex justify-center">
            <img
              src={modalImage}
              alt="Loadout"
              className="max-w-full max-h-96 object-contain"
            />
          </div>
        )}
      </Modal>

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
