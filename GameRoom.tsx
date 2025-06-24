import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { GameState } from '../types';
import { Send, Users, Clock, MessageCircle } from 'lucide-react';

interface GameRoomProps {
  gameState: GameState;
  onSendMessage: (message: string) => void;
  onStartVoting: () => void;
}

export const GameRoom: React.FC<GameRoomProps> = ({ gameState, onSendMessage, onStartVoting }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [gameState.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timePercentage = (gameState.timeRemaining / 300) * 100;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Persona Echo - Manche {gameState.round}
          </h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-neon-cyan" />
              <span className="text-white font-mono text-lg">
                {formatTime(gameState.timeRemaining)}
              </span>
            </div>
            <Button onClick={onStartVoting} variant="secondary">
              Passer au Vote
            </Button>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="w-full bg-dark-surface rounded-full h-2 mb-6">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              timePercentage > 50 ? 'bg-gradient-to-r from-neon-cyan to-neon-purple' :
              timePercentage > 25 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
              'bg-gradient-to-r from-red-500 to-red-700'
            }`}
            style={{ width: `${timePercentage}%` }}
          ></div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card glow className="h-[600px] flex flex-col animate-slide-up">
              <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-600">
                <MessageCircle className="w-5 h-5 text-neon-purple" />
                <h3 className="text-lg font-semibold text-white">Discussion</h3>
                <span className="text-sm text-gray-400">({gameState.messages.length} messages)</span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                {gameState.messages.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun message pour le moment...</p>
                    <p className="text-sm">Commencez la conversation pour découvrir qui se cache derrière chaque persona!</p>
                  </div>
                ) : (
                  gameState.messages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg animate-slide-up ${
                        msg.playerId === gameState.currentPlayer.id
                          ? 'bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border border-neon-purple/30 ml-8'
                          : 'bg-dark-surface border border-gray-600 mr-8'
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-medium ${
                          msg.playerId === gameState.currentPlayer.id ? 'text-neon-cyan' : 'text-white'
                        }`}>
                          {msg.playerName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{msg.message}</p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </Card>
          </div>

          {/* Players Sidebar */}
          <div className="space-y-6">
            <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-neon-cyan" />
                <h3 className="text-lg font-semibold text-white">Joueurs</h3>
              </div>

              <div className="space-y-3">
                {gameState.players.map((player, index) => (
                  <div
                    key={player.id}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      player.id === gameState.currentPlayer.id
                        ? 'bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border-neon-purple/50'
                        : 'bg-dark-surface border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {player.persona?.name?.[0] || player.username[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">
                          {player.persona?.name || player.username}
                        </p>
                        {player.persona && (
                          <p className="text-xs text-gray-400 truncate">
                            {player.persona.profession}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Score: {player.score}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold text-white mb-4">Instructions</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Interagissez naturellement avec votre persona</p>
                <p>• Posez des questions pour découvrir les autres</p>
                <p>• Restez cohérent avec votre identité fictive</p>
                <p>• Observez les incohérences chez les autres</p>
              </div>
            </Card>

            <Button
              glow
              size="lg"
              onClick={onStartVoting}
              className="w-full animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              Commencer le Vote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};