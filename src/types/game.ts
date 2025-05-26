export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'ready' | 'playing' | 'paused' | 'game-over';

export interface Position {
  x: number;
  y: number;
}