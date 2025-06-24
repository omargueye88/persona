export interface Player {
  id: string;
  username: string;
  persona?: Persona;
  score: number;
  isReady: boolean;
  isConnected?: boolean;
  avatar?: string;
}

export interface Persona {
  name: string;
  age: string;
  profession: string;
  traits: string;
  backstory?: string;
  hobbies?: string[];
  quirks?: string[];
}

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: Date;
  isSystemMessage?: boolean;
  reactions?: { [emoji: string]: string[] };
}

export interface Vote {
  voterId: string;
  targetId: string;
  guess: string;
  confidence?: number;
}

export interface GameState {
  phase: 'home' | 'auth' | 'create-persona' | 'waiting' | 'playing' | 'voting' | 'reveal';
  gameId?: string;
  players: Player[];
  currentPlayer: Player;
  messages: ChatMessage[];
  votes: Vote[];
  timeRemaining: number;
  round: number;
  isHost?: boolean;
  gameSettings?: {
    roundDuration: number;
    votingDuration: number;
    minPlayers: number;
    maxRounds: number;
  };
}

export interface GameRoom {
  id: string;
  name: string;
  hostName: string;
  currentPlayers: number;
  maxPlayers: number;
  phase: string;
  isPrivate: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface UserStats {
  gamesPlayed: number;
  totalScore: number;
  averageScore: number;
  bestGuessStreak: number;
  favoritePersona: string;
  achievements: Achievement[];
}