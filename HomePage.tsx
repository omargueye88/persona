import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { useAuth } from '../hooks/useAuth';
import { Users, Zap, Eye, Plus, Search, LogOut, User } from 'lucide-react';

interface HomePageProps {
  onCreateGame: () => void;
  onJoinGame: (gameId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCreateGame, onJoinGame }) => {
  const { user, signOut } = useAuth();
  const [gameId, setGameId] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameId.trim()) {
      onJoinGame(gameId.trim());
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* User Info */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="flex items-center space-x-3">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-neon-purple"
              />
            )}
            <div>
              <p className="text-white font-medium">Bienvenue, {user?.displayName}</p>
              <p className="text-gray-400 text-sm">Prêt pour une nouvelle partie?</p>
            </div>
          </div>
          <Button
            variant="secondary"
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Eye className="w-12 h-12 text-neon-purple mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Persona Echo
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Un jeu social narratif où l'art de la tromperie rencontre la psychologie humaine. 
            Créez une fausse identité, infiltrez-vous, et découvrez qui se cache derrière chaque masque.
          </p>
        </div>

        {/* Game Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <Users className="w-8 h-8 text-neon-cyan mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Multijoueur</h3>
            <p className="text-gray-400 text-sm">Jusqu'à 8 joueurs dans une partie intense de déduction sociale</p>
          </Card>
          
          <Card className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Zap className="w-8 h-8 text-neon-purple mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Temps Réel</h3>
            <p className="text-gray-400 text-sm">Chat en direct et interactions instantanées pour une immersion totale</p>
          </Card>
          
          <Card className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Eye className="w-8 h-8 text-neon-cyan mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Déduction</h3>
            <p className="text-gray-400 text-sm">Analysez, déduisez et percez les secrets de vos adversaires</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              glow 
              onClick={onCreateGame}
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Créer une Partie</span>
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg"
              className="w-full sm:w-auto min-w-[200px] flex items-center justify-center space-x-2"
              onClick={() => setShowJoinForm(!showJoinForm)}
            >
              <Search className="w-5 h-5" />
              <span>Rejoindre une Partie</span>
            </Button>
          </div>

          {/* Join Game Form */}
          {showJoinForm && (
            <Card className="max-w-md mx-auto animate-slide-up">
              <form onSubmit={handleJoinGame} className="space-y-4">
                <h3 className="text-lg font-semibold text-white text-center">Rejoindre une Partie</h3>
                <Input
                  placeholder="Code de la partie (ex: ABC123)"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value.toUpperCase())}
                  className="text-center text-lg tracking-wider"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowJoinForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    disabled={!gameId.trim()}
                    className="flex-1"
                  >
                    Rejoindre
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>

        {/* Game Rules Preview */}
        <Card className="mt-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Comment Jouer</h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-neon-purple rounded-full flex items-center justify-center text-white font-bold mx-auto">1</div>
              <p className="text-sm text-gray-300">Créez votre persona fictif</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-neon-purple rounded-full flex items-center justify-center text-white font-bold mx-auto">2</div>
              <p className="text-sm text-gray-300">Interagissez avec les autres</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-neon-purple rounded-full flex items-center justify-center text-white font-bold mx-auto">3</div>
              <p className="text-sm text-gray-300">Votez pour deviner les identités</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-neon-purple rounded-full flex items-center justify-center text-white font-bold mx-auto">4</div>
              <p className="text-sm text-gray-300">Découvrez qui vous a trompé</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};