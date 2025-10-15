import { useState, useEffect } from 'react'
import Modal from './Modal'
import Button from './Button'

interface ScoreModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ScoreCalculationData) => void
  rowIndex: number
  colIndex: number
  initialData?: ScoreCalculationData
}

export interface ScoreCalculationData {
  kills: number
  bonus: number
  rewards: number
  penalty: number
  multiplier: number
  cost: number
}

const INITIAL_SCORE_DATA: ScoreCalculationData = {
  kills: 0,
  bonus: 0,
  rewards: 0,
  penalty: 0,
  multiplier: 1,
  cost: 100
}

export default function ScoreModal({
  isOpen,
  onClose,
  onSave,
  rowIndex,
  colIndex,
  initialData = INITIAL_SCORE_DATA
}: ScoreModalProps) {
  const [formData, setFormData] = useState<ScoreCalculationData>(initialData)
  
  // Обновляем данные при изменении initialData
  useEffect(() => {
    setFormData(initialData)
  }, [initialData])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const costValues = [100, 125, 150, 175, 200]
  const currentCost = costValues[rowIndex]

  const calculateResult = () => {
    const { kills, bonus, rewards, penalty, multiplier, cost } = formData
    
    if (kills === 0 && rewards === 0) {
      // Только штраф
      const penaltyAmount = (cost + penalty) * multiplier
      return { result: 0, penalty: penaltyAmount }
    } else {
      // Очки + штраф
      const result = ((cost * kills) + (bonus * kills) + (rewards * ((cost + bonus) / 2))) * multiplier
      const penaltyAmount = penalty * multiplier
      return { result, penalty: penaltyAmount }
    }
  }

  const handleInputChange = (field: keyof ScoreCalculationData, value: string) => {
    const numValue = parseFloat(value) || 0
    setFormData(prev => ({ ...prev, [field]: numValue }))
    
    // Очистить ошибку при изменении
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (formData.kills < 0) newErrors.kills = 'Количество убийств не может быть отрицательным'
    if (formData.bonus < 0) newErrors.bonus = 'Бонус не может быть отрицательным'
    if (formData.rewards < 0) newErrors.rewards = 'Награды не могут быть отрицательными'
    if (formData.penalty < 0) newErrors.penalty = 'Штраф не может быть отрицательным'
    if (formData.multiplier <= 0) newErrors.multiplier = 'Множитель должен быть больше 0'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return
    
    const dataWithCost = { ...formData, cost: currentCost }
    onSave(dataWithCost)
    onClose()
  }

  const handleReset = () => {
    setFormData(INITIAL_SCORE_DATA)
    setErrors({})
  }

  const { result, penalty } = calculateResult()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Расчет очков - Ячейка ${rowIndex + 1}-${colIndex + 1}`}
      size="lg"
    >
      <div className="space-y-8">
        {/* Информация о ячейке */}
        <div className="bg-gradient-to-br from-dark-700/80 to-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-500/30 shadow-glow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent font-cinzel">
              Информация о карточке
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Строка:</span>
              <span className="text-primary-300 font-bold">{rowIndex + 1}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Колонка:</span>
              <span className="text-primary-300 font-bold">{colIndex + 1}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Стоимость:</span>
              <span className="text-secondary-300 font-bold">${currentCost}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Множитель:</span>
              <span className="text-accent font-bold">{formData.multiplier}x</span>
            </div>
          </div>
        </div>

        {/* Форма расчета */}
        <div className="bg-gradient-to-br from-dark-700/80 to-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-500/30 shadow-glow">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-success font-cinzel">
              Параметры расчета
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                <span>Убийства</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.kills}
                onChange={(e) => handleInputChange('kills', e.target.value)}
                className={`w-full px-4 py-3 bg-dark-800/60 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${
                  errors.kills ? 'border-danger shadow-glow' : 'border-primary-500/30 hover:border-primary-500/60'
                }`}
                placeholder="0"
              />
              {errors.kills && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.kills}</span>
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                <span>Бонус за убийство</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.bonus}
                onChange={(e) => handleInputChange('bonus', e.target.value)}
                className={`w-full px-4 py-3 bg-dark-800/60 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300 ${
                  errors.bonus ? 'border-danger shadow-glow' : 'border-secondary-500/30 hover:border-secondary-500/60'
                }`}
                placeholder="0"
              />
              {errors.bonus && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.bonus}</span>
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span>Награды (0-4)</span>
              </label>
              <input
                type="number"
                min="0"
                max="4"
                value={formData.rewards}
                onChange={(e) => handleInputChange('rewards', e.target.value)}
                className={`w-full px-4 py-3 bg-dark-800/60 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 ${
                  errors.rewards ? 'border-danger shadow-glow' : 'border-accent/30 hover:border-accent/60'
                }`}
                placeholder="0"
              />
              {errors.rewards && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.rewards}</span>
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-danger rounded-full"></span>
                <span>Дополнительный штраф</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.penalty}
                onChange={(e) => handleInputChange('penalty', e.target.value)}
                className={`w-full px-4 py-3 bg-dark-800/60 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-danger transition-all duration-300 ${
                  errors.penalty ? 'border-danger shadow-glow' : 'border-danger/30 hover:border-danger/60'
                }`}
                placeholder="0"
              />
              {errors.penalty && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.penalty}</span>
              </p>}
            </div>

            <div className="col-span-2 space-y-2">
              <label className="block text-sm font-medium text-gray-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-warning rounded-full"></span>
                <span>Множитель</span>
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={formData.multiplier}
                onChange={(e) => handleInputChange('multiplier', e.target.value)}
                className={`w-full px-4 py-3 bg-dark-800/60 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-warning transition-all duration-300 ${
                  errors.multiplier ? 'border-danger shadow-glow' : 'border-warning/30 hover:border-warning/60'
                }`}
                placeholder="1.0"
              />
              {errors.multiplier && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.multiplier}</span>
              </p>}
            </div>
          </div>
        </div>

        {/* Результат расчета */}
        <div className="bg-gradient-to-br from-dark-700/80 to-dark-800/80 backdrop-blur-sm rounded-2xl p-6 border border-primary-500/30 shadow-glow">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-success to-secondary-400 font-cinzel">
              Результат расчета
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-6 border border-success/30">
              <div className="relative">
                <div className="text-4xl font-bold text-success mb-2">
                  +{result.toFixed(0)}
                </div>
                <div className="text-sm text-gray-300 font-medium">Очки</div>
                <div className="absolute inset-0 bg-success/10 rounded-xl blur-sm animate-pulse"></div>
              </div>
            </div>
            <div className="text-center bg-gradient-to-br from-danger/10 to-danger/5 rounded-xl p-6 border border-danger/30">
              <div className="relative">
                <div className="text-4xl font-bold text-danger mb-2">
                  -{penalty.toFixed(0)}
                </div>
                <div className="text-sm text-gray-300 font-medium">Штраф</div>
                <div className="absolute inset-0 bg-danger/10 rounded-xl blur-sm animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Итоговый результат */}
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-primary-500/20 to-accent/20 rounded-xl p-4 border border-primary-500/30">
              <div className="text-lg text-gray-300 mb-2">Итоговый результат:</div>
              <div className={`text-3xl font-bold ${
                result - penalty > 0 ? 'text-success' : 'text-danger'
              }`}>
                {result - penalty > 0 ? '+' : ''}{(result - penalty).toFixed(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={handleReset} className="hover:scale-105 transition-transform duration-300">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-warning rounded-full"></span>
              <span>Сбросить</span>
            </span>
          </Button>
          <div className="flex space-x-4">
            <Button variant="secondary" onClick={onClose} className="hover:scale-105 transition-transform duration-300">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>Отмена</span>
              </span>
            </Button>
            <Button onClick={handleSave} className="hover:scale-105 transition-transform duration-300 shadow-glow">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                <span>Сохранить</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
