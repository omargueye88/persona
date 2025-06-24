import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export interface SocketMessage {
  playerId: string;
  playerName: string;
  message: string;
  timestamp: string;
}

class SocketService {
  private socket: Socket | null = null;
  private messageCallbacks: ((message: SocketMessage) => void)[] = [];

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log('✅ Connecté au serveur');
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Déconnecté du serveur');
      });

      this.socket.on('receive_message', (data: SocketMessage) => {
        this.messageCallbacks.forEach(callback => callback(data));
      });

      this.socket.on('connect_error', (error) => {
        console.error('Erreur de connexion :', error);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(messageData: SocketMessage) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('send_message', messageData);
    } else {
      console.error('⚠️ Socket non connecté');
    }
  }

  startGame(game_id: string) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('start_game', { game_id });
    } else {
      console.error("Impossible de démarrer la partie : socket non connecté");
    }
  }

  onMessage(callback: (message: SocketMessage) => void) {
    this.messageCallbacks.push(callback);
  }

  removeMessageListener(callback: (message: SocketMessage) => void) {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();