// Константы для приложения Dead Man's Loadout

export const LOADOUT_CONFIG = {
  ROWS: 5,
  COLS: 6,
  ROW_LABELS: ["100", "125", "150", "175", "200"] as string[],
  COLUMN_LABELS: ["Младший", "Средний", "Старший", "Сосед", "Пёс соседа", "Всё могу (x2)"] as string[],
  IMAGE_PATH: "/Loadouts/Light-Caliber",
  MARKED_CELLS: [
    [2, 1], [3, 1], [1, 3], [2, 2], [3, 3],
    [4, 2], [5, 2], [4, 3], [5, 3], [1, 5],
    [2, 5], [3, 5], [4, 5], [5, 5]
  ] as number[][]
}

export const STORAGE_KEYS = {
  ACTIVE_TEAM: 'activeTeam',
  PLAYED_CELL: (rowIdx: number, colIdx: number) => `played-${rowIdx}-${colIdx}`,
  LEADERBOARD_DATA: 'leaderboardData',
  MODIFIERS_DATA: 'modifiersData'
} as const

export const DEFAULT_TEAM = ['Игрок 1', 'Игрок 2', 'Игрок 3'] as const

export const TEAM_COLORS = {
  PRIMARY: '#00e7f8',
  PLAYER_1: '#ffcc00',
  PLAYER_2: '#66ff99', 
  PLAYER_3: '#ff66cc'
} as const

export const SCORE_CONFIG = {
  MAX_REWARDS: 4,
  DEFAULT_MULTIPLIER: 1,
  MIN_MULTIPLIER: 0.1
} as const

export const UI_CONFIG = {
  GRID_CELL_SIZE: {
    HEADER_WIDTH: 100,
    HEADER_HEIGHT: 100,
    CELL_WIDTH: 180,
    CELL_HEIGHT: 200  // Увеличиваем высоту для прямоугольных изображений
  },
  MODAL_SIZES: {
    SM: 'sm',
    MD: 'md', 
    LG: 'lg',
    XL: 'xl'
  }
} as const
