import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { GameState } from '../types';
import { Vote, Target, CheckCircle } from 'lucide-react';

interface VotingPageProps {
  gameState: GameState;
  onSubmitVote: (targetId: string, guess: string) => void;
}

export const VotingPage: React.FC<VotingPageProps> = ({ gameState, onSubmitVote }) => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [hasVoted, setHasVoted] = useState(false);

  const otherPlayers = gameState.players.filter(p => p.id !== gameState.currentPlayer.id);

  const handleSubmitVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTarget && guess.trim()) {
      onSubmitVote(selectedTarget, guess);
      setHasVoted(true);
    }
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card glow className="max-w-md w-full text-center animate-fade-in">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Vote Enregistré!</h2>
          <p className="text-gray-300 mb-6">
            Votre vote a été pris en compte. En attente des autres joueurs...
          </p>
          <div className="animate-pulse">
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-4">
            Phase de Vote
          </h1>
          <p className="text-gray-300">
            C'est le moment de vérité! Qui pensez-vous avoir percé à jour?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voting Form */}
          <Card glow className="animate-slide-up">
            <div className="flex items-center space-x-2 mb-6">
              <Vote className="w-5 h-5 text-neon-purple" />
              <h3 className="text-xl font-semibold text-white">Votre Vote</h3>
            </div>

            <form onSubmit={handleSubmitVote} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Choisissez un joueur à démasquer:
                </label>
                <div className="space-y-3">
                  {otherPlayers.map((player) => (
                    <div
                      key={player.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedTarget === player.id
                          ? 'bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border-neon-purple'
                          : 'bg-dark-surface border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => setSelectedTarget(player.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full flex items-center justify-center text-white font-bold">
                          {player.persona?.name?.[0] || player.username[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {player.persona?.name || player.username}
                          </p>
                          {player.persona && (
                            <p className="text-sm text-gray-400">
                              {player.persona.profession}, {player.persona.age}
                            </p>
                          )}
                        </div>
                        {selectedTarget === player.id && (
                          <Target className="w-5 h-5 text-neon-purple ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTarget && (
                <div className="animate-slide-up">
                  <Input
                    label="Votre hypothèse sur sa vraie identité"
                    placeholder="ex: Je pense que c'est en réalité un étudiant en informatique..."
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                  />
                </div>
              )}

              <Button
                type="submit"
                glow
                size="lg"
                disabled={!selectedTarget || !guess.trim()}
                className="w-full"
              >
                Confirmer Mon Vote
              </Button>
            </form>
          </Card>

          {/* Game Summary */}
          <div className="space-y-6">
            <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-semibold text-white mb-4">Récapitulatif de la Manche</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Messages échangés:</span>
                  <span className="text-white">{gameState.messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Joueurs actifs:</span>
                  <span className="text-white">{gameState.players.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Manche:</span>
                  <span className="text-white">#{gameState.round}</span>
                </div>
              </div>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold text-white mb-4">Votre Persona</h3>
              {gameState.currentPlayer.persona && (
                <div className="space-y-2">
                  <p className="text-neon-cyan font-medium">{gameState.currentPlayer.persona.name}</p>
                  <p className="text-sm text-gray-400">{gameState.currentPlayer.persona.profession}</p>
                  <p className="text-sm text-gray-400">{gameState.currentPlayer.persona.age}</p>
                  <p className="text-xs text-gray-500 mt-2">{gameState.currentPlayer.persona.traits}</p>
                </div>
              )}
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-semibold text-white mb-4">💡 Conseils de Vote</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Analysez les incohérences dans les réponses</li>
                <li>• Observez qui évite certaines questions</li>
                <li>• Repérez les détails trop parfaits ou clichés</li>
                <li>• Faites confiance à votre instinct</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};