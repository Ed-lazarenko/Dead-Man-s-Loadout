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
      <div>
        <div>
          <div>Информация о карточке</div>
          <div>
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

        <div>
          <div>Параметры расчета</div>
          <div>
            <div className="space-y-2">
              <label>Убийства</label>
              <input
                type="number"
                min="0"
                value={formData.kills}
                onChange={(e) => handleInputChange('kills', e.target.value)}
                
                placeholder="0"
              />
              {errors.kills && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.kills}</span>
              </p>}
            </div>

            <div className="space-y-2">
              <label>Бонус за убийство</label>
              <input
                type="number"
                min="0"
                value={formData.bonus}
                onChange={(e) => handleInputChange('bonus', e.target.value)}
                
                placeholder="0"
              />
              {errors.bonus && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.bonus}</span>
              </p>}
            </div>

            <div className="space-y-2">
              <label>Награды (0-4)</label>
              <input
                type="number"
                min="0"
                max="4"
                value={formData.rewards}
                onChange={(e) => handleInputChange('rewards', e.target.value)}
                
                placeholder="0"
              />
              {errors.rewards && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.rewards}</span>
              </p>}
            </div>

            <div className="space-y-2">
              <label>Дополнительный штраф</label>
              <input
                type="number"
                min="0"
                value={formData.penalty}
                onChange={(e) => handleInputChange('penalty', e.target.value)}
                
                placeholder="0"
              />
              {errors.penalty && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.penalty}</span>
              </p>}
            </div>

            <div className="col-span-2 space-y-2">
              <label>Множитель</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={formData.multiplier}
                onChange={(e) => handleInputChange('multiplier', e.target.value)}
                
                placeholder="1.0"
              />
              {errors.multiplier && <p className="text-danger text-xs mt-1 flex items-center space-x-1">
                <span className="w-1 h-1 bg-danger rounded-full"></span>
                <span>{errors.multiplier}</span>
              </p>}
            </div>
          </div>
        </div>

        <div>
          <div>Результат расчета</div>
          <div>
            <div>
              <div>+{result.toFixed(0)}</div>
              <div>Очки</div>
            </div>
            <div>
              <div>-{penalty.toFixed(0)}</div>
              <div>Штраф</div>
            </div>
          </div>
          <div>
            <div>
              <div>Итоговый результат:</div>
              <div>
                {result - penalty > 0 ? '+' : ''}{(result - penalty).toFixed(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div>
          <Button variant="ghost" onClick={handleReset}>Сбросить</Button>
          <div>
            <Button variant="secondary" onClick={onClose}>Отмена</Button>
            <Button onClick={handleSave}>Сохранить</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
