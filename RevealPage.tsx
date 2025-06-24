import React from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { GameState } from '../types';
import { Trophy, Target, Users, RotateCcw, Home } from 'lucide-react';

interface RevealPageProps {
  gameState: GameState;
  onNextRound: () => void;
  onBackToHome: () => void;
}

export const RevealPage: React.FC<RevealPageProps> = ({ gameState, onNextRound, onBackToHome }) => {
  // Mock reveal data - in real app this would come from backend
  const reveals = gameState.players.map(player => ({
    ...player,
    realIdentity: `Vraie identité de ${player.persona?.name || player.username}`,
    wasGuessed: Math.random() > 0.5,
    guessedBy: gameState.players[Math.floor(Math.random() * gameState.players.length)],
  }));

  const correctGuesses = reveals.filter(r => r.wasGuessed).length;
  const totalPlayers = gameState.players.length;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
            Révélation des Identités
          </h1>
          <p className="text-gray-300">
            Découvrez qui se cachait derrière chaque persona et les scores de cette manche!
          </p>
        </div>

        {/* Round Summary */}
        <Card glow className="mb-8 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Trophy className="w-8 h-8 text-neon-purple mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{correctGuesses}</p>
              <p className="text-gray-400">Identités découvertes</p>
            </div>
            <div>
              <Target className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{Math.round((correctGuesses / totalPlayers) * 100)}%</p>
              <p className="text-gray-400">Taux de réussite</p>
            </div>
            <div>
              <Users className="w-8 h-8 text-neon-purple mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{gameState.round}</p>
              <p className="text-gray-400">Manche terminée</p>
            </div>
          </div>
        </Card>

        {/* Player Reveals */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {reveals.map((player, index) => (
            <Card
              key={player.id}
              className={`animate-slide-up ${player.wasGuessed ? 'border-green-500/50' : 'border-red-500/50'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {player.persona?.name?.[0] || player.username[0]}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {player.persona?.name || player.username}
                    </h3>
                    {player.wasGuessed ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        DÉCOUVERT
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                        NON DÉCOUVERT
                      </span>
                    )}
                  </div>
                  
                  {player.persona && (
                    <div className="space-y-1 mb-3">
                      <p className="text-sm text-gray-400">
                        <span className="font-medium">Profession:</span> {player.persona.profession}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium">Âge:</span> {player.persona.age}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Traits:</span> {player.persona.traits}
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-dark-surface rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-neon-cyan">Vraie identité:</span> {player.realIdentity}
                    </p>
                  </div>
                  
                  {player.wasGuessed && (
                    <p className="text-sm text-green-400">
                      Découvert par: {player.guessedBy?.persona?.name || player.guessedBy?.username}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-600">
                    <span className="text-sm text-gray-400">Score de la manche:</span>
                    <span className="text-lg font-bold text-neon-cyan">
                      +{player.wasGuessed ? 50 : 100}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card glow className="mb-8 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Classement Général</h3>
          <div className="space-y-3">
            {gameState.players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/50' :
                    index === 2 ? 'bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-600/50' :
                    'bg-dark-surface border border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {player.persona?.name || player.username}
                      </p>
                      {player.id === gameState.currentPlayer.id && (
                        <span className="text-xs text-neon-cyan">Vous</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{player.score}</p>
                    <p className="text-xs text-gray-400">points</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            glow
            onClick={onNextRound}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Manche Suivante</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={onBackToHome}
            className="flex items-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Retour à l'Accueil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};