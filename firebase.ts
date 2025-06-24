import { Timestamp, FieldValue } from 'firebase/firestore';

export interface PersonaData {
  name: string;
  age: string;
  profession: string;
  traits: string;
  backstory?: string;
  hobbies?: string[];
  quirks?: string[];
}

export interface GameData {
  id: string;
  hostId: string;
  hostName: string;
  phase: 'waiting' | 'playing' | 'voting' | 'reveal' | 'finished';
  round: number;
  maxPlayers: number;
  currentPlayers: number;
  timeRemaining: number;
  isActive: boolean;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  settings: {
    roundDuration: number;
    votingDuration: number;
    minPlayers: number;
    maxRounds: number;
  };
}

export interface PlayerData {
  id: string;
  gameId: string;
  playerId: string;
  playerName: string;
  isReady: boolean;
  isConnected: boolean;
  score: number;
  persona: PersonaData | null;
  joinedAt: Timestamp | FieldValue;
  lastSeen: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
}

export interface MessageData {
  id: string;
  gameId: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: Timestamp | FieldValue | Date;
  isSystemMessage: boolean;
}

export interface VoteData {
  id: string;
  gameId: string;
  voterId: string;
  targetId: string;
  guess: string;
  round: number;
  timestamp: Timestamp | FieldValue;
}

export interface GameStats {
  id: string;
  gameId: string;
  totalMessages: number;
  totalVotes: number;
  averageGuessAccuracy: number;
  mostActivePlayer: string;
  gameEndedAt: Timestamp | FieldValue;
}

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  lastLoginAt: Date;
  gamesPlayed: number;
  totalScore: number;
  avatar?: string;
}