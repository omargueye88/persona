import React, { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { useAuth } from './hooks/useAuth';
import { ConnectionStatus } from './components/ConnectionStatus';
import { AuthPage } from './components/AuthPage';
import { HomePage } from './components/HomePage';
import { CreatePersonaPage } from './components/CreatePersonaPage';
import { WaitingRoom } from './components/WaitingRoom';
import { GameRoom } from './components/GameRoom';
import { VotingPage } from './components/VotingPage';
import { RevealPage } from './components/RevealPage';

function App() {
  const { user, loading: authLoading } = useAuth();
  const gameState = useGameState();

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple mx-auto mb-4"></div>
          <p className="text-gray-300">Chargement...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
        <AuthPage />
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (gameState.gameState.phase) {
      case 'home':
        return (
          <HomePage 
            onCreateGame={async () => {
              await gameState.createGame();
            }}
            onJoinGame={gameState.joinGame}
          />
        );
      case 'create-persona':
        return (
          <CreatePersonaPage 
            onCreatePersona={gameState.createPersona}
            onBack={() => gameState.setPhase('home')}
          />
        );
      case 'waiting':
        return (
          <WaitingRoom 
            gameState={gameState.gameState} 
            onStartGame={gameState.startGame}
            onBack={gameState.leaveGame}
          />
        );
      case 'playing':
        return (
          <GameRoom 
            gameState={gameState.gameState} 
            onSendMessage={gameState.sendMessage} 
            onStartVoting={gameState.startVoting}
          />
        );
      case 'voting':
        return (
          <VotingPage 
            gameState={gameState.gameState} 
            onSubmitVote={gameState.submitVote} 
          />
        );
      case 'reveal':
        return (
          <RevealPage 
            gameState={gameState.gameState} 
            onNextRound={() => gameState.setPhase('playing')}
            onBackToHome={() => gameState.setPhase('home')} 
          />
        );
      default:
        return (
          <HomePage 
            onCreateGame={async () => {
              await gameState.createGame();
            }}
            onJoinGame={gameState.joinGame}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      <ConnectionStatus 
        isConnected={gameState.isConnected} 
        error={gameState.error}
        onRetry={gameState.clearError}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;