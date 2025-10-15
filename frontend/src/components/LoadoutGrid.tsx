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
      {/* Main grid container with enhanced styling */}
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl blur-2xl"></div>
        
        {/* Grid container */}
        <div className="relative bg-dark-800/60 backdrop-blur-md rounded-3xl p-6 border border-primary-500/30 shadow-glow">
          {/* Decorative elements */}
          <div className="absolute top-6 left-6 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-secondary-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-accent rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 right-6 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
          
          {/* Grid - увеличенные размеры для лучшего отображения */}
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: `${UI_CONFIG.GRID_CELL_SIZE.HEADER_WIDTH}px repeat(6, ${UI_CONFIG.GRID_CELL_SIZE.CELL_WIDTH}px)`,
              gridTemplateRows: `${UI_CONFIG.GRID_CELL_SIZE.HEADER_HEIGHT}px repeat(5, ${UI_CONFIG.GRID_CELL_SIZE.CELL_HEIGHT}px)`
            }}
          >
          {/* Заголовок */}
          <div className="bg-gradient-to-br from-dark-700 to-dark-800 text-white text-center font-bold border-2 border-primary-500/50 rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-2xl animate-pulse">💀</span>
          </div>
          
          {/* Колонки */}
          {data.columns.map((column, idx) => (
            <div key={idx} className="bg-gradient-to-br from-dark-700 to-dark-800 text-white text-center font-bold text-lg border-2 border-primary-500/50 rounded-xl flex items-center justify-center shadow-glow">
              <span className="text-primary-300 font-cinzel tracking-wide">{column}</span>
            </div>
          ))}

          {/* Строки */}
          {data.cells.map((row, rowIdx) => {
            const rowLabel = data.rows[rowIdx]
            const cost = parseInt(rowLabel)
            
            return [
              // Заголовок строки
              <div key={`row-${rowIdx}`} className="bg-gradient-to-br from-dark-700 to-dark-800 text-white text-center font-semibold text-sm border-2 border-primary-500/50 rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-secondary-300 font-cinzel">{rowLabel}</span>
              </div>,
              // Ячейки строки
              ...row.map((cell, colIdx) => {
                const isMarked = isCellMarked(rowIdx, colIdx, data.marked)
                
                return (
                  <div
                    key={`cell-${rowIdx}-${colIdx}`}
                    className={`
                      relative border-2 cursor-pointer transition-all duration-300 ease-out
                      group overflow-hidden rounded-xl
                      ${cell.state === 'closed' 
                        ? 'bg-gradient-to-br from-dark-900 to-dark-800 border-primary-500/30 hover:border-primary-500/60 hover:shadow-glow' 
                        : ''
                      }
                      ${cell.state === 'opened' 
                        ? 'bg-gradient-to-br from-dark-700 to-dark-600 border-primary-500/50 hover:border-primary-500/80 hover:shadow-glow hover:scale-105' 
                        : ''
                      }
                      ${cell.state === 'played' 
                        ? 'bg-gradient-to-br from-dark-600 to-dark-500 border-secondary-500/50 shadow-glow' 
                        : ''
                      }
                      hover:transform hover:scale-105
                      flex items-center justify-center
                    `}
                    onClick={() => handleCellClick(cell, rowIdx, colIdx)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      handleCellRightClick(cell, rowIdx, colIdx, cost)
                    }}
                  >
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    
                    {/* Изображение - оптимизировано для прямоугольных картинок */}
                    {cell.state !== 'closed' && (
                      <img
                        src={cell.image}
                        alt=""
                        className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          console.error('Failed to load image:', cell.image)
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                    
                    {/* Закрытая карточка */}
                    {cell.state === 'closed' && (
                      <div className="w-full h-full bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center relative z-10">
                        <div className="relative">
                          <span className="text-primary-400 text-4xl font-bold animate-pulse">?</span>
                          <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-lg animate-pulse"></div>
                        </div>
                      </div>
                    )}

                    {/* Пометка ★ */}
                    {isMarked && cell.state !== 'played' && (
                      <div className="absolute top-2 right-2 text-warning text-xl font-bold z-20 animate-bounce-slow">
                        <div className="relative">
                          <span className="drop-shadow-lg">★</span>
                          <div className="absolute inset-0 bg-warning/30 rounded-full blur-sm animate-pulse"></div>
                        </div>
                      </div>
                    )}

                    {/* Overlay для отыгранных */}
                    {cell.state === 'played' && cell.playedData && (
                      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 to-dark-800/90 backdrop-blur-sm flex flex-col items-center justify-center text-white text-xs rounded-xl z-20">
                        <div className="relative">
                          <div className={`font-bold text-lg ${
                            cell.playedData.penalty > 0 ? 'text-danger' : 'text-success'
                          }`}>
                            {cell.playedData.penalty > 0 
                              ? `−${cell.playedData.penalty}` 
                              : `+${cell.playedData.result}`
                            }
                          </div>
                          <div className="text-xs text-gray-300 mt-1 font-medium">Отыграно</div>
                          {/* Glow effect for played cards */}
                          <div className={`absolute inset-0 rounded-full blur-sm ${
                            cell.playedData.penalty > 0 ? 'bg-danger/30' : 'bg-success/30'
                          } animate-pulse`}></div>
                        </div>
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
    </div>
  )
}
