export enum HandPhase {
  FIST_VARIANTS = "Fist Variants", // A, S, E, T, M, N
  EXTENSIONS = "Extensions", // D, I, U, R, K, V, W
  OPEN_FLAT = "Open & Flat", // B, C, F, O, L, Y
  MOTION_ORIENTATION = "Motion & Orientation" // G, H, P, Q, J, Z
}

export enum MasteryLevel {
  LOCKED = "locked",
  NOVICE = "novice",
  APPRENTICE = "apprentice",
  MASTER = "master"
}

export interface LetterGroup {
  id: string;
  name: string;
  phase: HandPhase;
  letters: string[];
  description: string;
}

export interface UserStats {
  streak: number;
  dailyGoalProgress: number; // 0 to 100
  masteredLetters: string[];
  strugglingLetters: string[]; // e.g., ["S", "T"]
  transitionSpeeds: Record<string, number>; // "A-S": 1200ms
}

export interface LetterState {
  char: string;
  status: 'pending' | 'correct' | 'current';
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  streak: number;
  xp: number;
  avatar: string;
  isUser?: boolean;
  status?: string; // e.g., "TOP OF THE CLASS", "On fire!"
  changeDirection?: 'up' | 'down' | 'same';
  changeAmount?: number;
}