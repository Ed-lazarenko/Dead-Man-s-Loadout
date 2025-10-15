// Утилиты для работы с данными и localStorage

import { STORAGE_KEYS, DEFAULT_TEAM, LOADOUT_CONFIG } from '../constants'
import type { LoadoutCellState, LoadoutCell, PlayedCellData } from '../types'

/**
 * Безопасное получение данных из localStorage
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Failed to parse localStorage item "${key}":`, error)
    return defaultValue
  }
}

/**
 * Безопасное сохранение данных в localStorage
 */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to save to localStorage "${key}":`, error)
  }
}

/**
 * Удаление элемента из localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove from localStorage "${key}":`, error)
  }
}

/**
 * Получение активной команды
 */
export function getActiveTeam(): string[] {
  return getFromStorage(STORAGE_KEYS.ACTIVE_TEAM, DEFAULT_TEAM)
}

/**
 * Сохранение активной команды
 */
export function saveActiveTeam(team: string[]): void {
  saveToStorage(STORAGE_KEYS.ACTIVE_TEAM, team)
}

/**
 * Получение данных отыгранной ячейки
 */
export function getPlayedCellData(rowIdx: number, colIdx: number): PlayedCellData | null {
  const key = STORAGE_KEYS.PLAYED_CELL(rowIdx, colIdx)
  return getFromStorage(key, null)
}

/**
 * Сохранение данных отыгранной ячейки
 */
export function savePlayedCellData(rowIdx: number, colIdx: number, data: PlayedCellData): void {
  const key = STORAGE_KEYS.PLAYED_CELL(rowIdx, colIdx)
  saveToStorage(key, data)
}

/**
 * Удаление данных отыгранной ячейки
 */
export function removePlayedCellData(rowIdx: number, colIdx: number): void {
  const key = STORAGE_KEYS.PLAYED_CELL(rowIdx, colIdx)
  removeFromStorage(key)
}

/**
 * Очистка всех отыгранных ячеек
 */
export function clearAllPlayedCells(): void {
  for (let rowIdx = 0; rowIdx < LOADOUT_CONFIG.ROWS; rowIdx++) {
    for (let colIdx = 0; colIdx < LOADOUT_CONFIG.COLS; colIdx++) {
      removePlayedCellData(rowIdx, colIdx)
    }
  }
}

/**
 * Проверка, помечена ли ячейка
 */
export function isCellMarked(rowIdx: number, colIdx: number, markedCells: number[][]): boolean {
  return markedCells.some(([r, c]) => (r - 1) === rowIdx && (c - 1) === colIdx)
}

/**
 * Создание начального состояния ячейки
 */
export function createInitialCell(rowIdx: number, colIdx: number): LoadoutCell {
  return {
    image: `${LOADOUT_CONFIG.IMAGE_PATH}/${rowIdx + 1}-${colIdx + 1}.png`,
    state: 'closed' as LoadoutCellState,
    isMarked: false
  }
}

/**
 * Валидация данных формы расчета очков
 */
export function validateScoreForm(data: {
  kills: number
  bonus: number
  rewards: number
  penalty: number
  multiplier: number
}): Record<string, string> {
  const errors: Record<string, string> = {}
  
  if (data.kills < 0) errors.kills = 'Количество убийств не может быть отрицательным'
  if (data.bonus < 0) errors.bonus = 'Бонус не может быть отрицательным'
  if (data.rewards < 0) errors.rewards = 'Награды не могут быть отрицательными'
  if (data.penalty < 0) errors.penalty = 'Штраф не может быть отрицательным'
  if (data.multiplier <= 0) errors.multiplier = 'Множитель должен быть больше 0'
  
  return errors
}

/**
 * Расчет результата по формуле
 */
export function calculateScoreResult(data: {
  kills: number
  bonus: number
  rewards: number
  penalty: number
  multiplier: number
  cost: number
}): { result: number; penalty: number } {
  const { kills, bonus, rewards, penalty, multiplier, cost } = data
  
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

/**
 * Форматирование числа с округлением
 */
export function formatNumber(num: number): number {
  return Math.round(num)
}

/**
 * Получение цвета игрока по индексу
 */
export function getPlayerColor(index: number): string {
  const colors = ['text-yellow-400', 'text-green-400', 'text-pink-400']
  return colors[index % colors.length]
}

/**
 * Легковесный логгер для отладки, чтобы централизованно управлять логами
 */
export function debugLog(...args: unknown[]): void {
  if (import.meta && import.meta.env && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[DML]', ...args)
  }
}
