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
      title={`Ячейка ${rowIndex + 1}-${colIndex + 1}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* Информация о ячейке */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Строка:</span>
              <span className="text-white ml-2">{rowIndex + 1}</span>
            </div>
            <div>
              <span className="text-gray-400">Колонка:</span>
              <span className="text-white ml-2">{colIndex + 1}</span>
            </div>
            <div>
              <span className="text-gray-400">Стоимость:</span>
              <span className="text-primary ml-2">${currentCost}</span>
            </div>
            <div>
              <span className="text-gray-400">Множитель:</span>
              <span className="text-accent ml-2">{formData.multiplier}x</span>
            </div>
          </div>
        </div>

        {/* Форма расчета */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Убийства
            </label>
            <input
              type="number"
              min="0"
              value={formData.kills}
              onChange={(e) => handleInputChange('kills', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.kills ? 'border-danger' : 'border-gray-600'
              }`}
            />
            {errors.kills && <p className="text-danger text-xs mt-1">{errors.kills}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Бонус за убийство
            </label>
            <input
              type="number"
              min="0"
              value={formData.bonus}
              onChange={(e) => handleInputChange('bonus', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.bonus ? 'border-danger' : 'border-gray-600'
              }`}
            />
            {errors.bonus && <p className="text-danger text-xs mt-1">{errors.bonus}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Награды (0-4)
            </label>
            <input
              type="number"
              min="0"
              max="4"
              value={formData.rewards}
              onChange={(e) => handleInputChange('rewards', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.rewards ? 'border-danger' : 'border-gray-600'
              }`}
            />
            {errors.rewards && <p className="text-danger text-xs mt-1">{errors.rewards}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Дополнительный штраф
            </label>
            <input
              type="number"
              min="0"
              value={formData.penalty}
              onChange={(e) => handleInputChange('penalty', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.penalty ? 'border-danger' : 'border-gray-600'
              }`}
            />
            {errors.penalty && <p className="text-danger text-xs mt-1">{errors.penalty}</p>}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Множитель
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={formData.multiplier}
              onChange={(e) => handleInputChange('multiplier', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.multiplier ? 'border-danger' : 'border-gray-600'
              }`}
            />
            {errors.multiplier && <p className="text-danger text-xs mt-1">{errors.multiplier}</p>}
          </div>
        </div>

        {/* Результат расчета */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Результат расчета</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                +{result.toFixed(0)}
              </div>
              <div className="text-sm text-gray-400">Очки</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-danger">
                -{penalty.toFixed(0)}
              </div>
              <div className="text-sm text-gray-400">Штраф</div>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-between">
          <Button variant="ghost" onClick={handleReset}>
            Сбросить
          </Button>
          <div className="space-x-3">
            <Button variant="secondary" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
