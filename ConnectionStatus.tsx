
import React from 'react';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  isConnected, 
  error, 
  onRetry 
}) => {
  if (error) {
    return (
      <div className="fixed top-4 right-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-center space-x-2 animate-slide-up z-50">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-red-400 text-sm">{error}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-red-400 hover:text-red-300 text-sm underline ml-2"
          >
            Réessayer
          </button>
        )}
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 flex items-center space-x-2 animate-slide-up z-50">
        <WifiOff className="w-4 h-4 text-yellow-400" />
        <span className="text-yellow-400 text-sm">Connexion au serveur...</span>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex items-center space-x-2 animate-slide-up z-50">
      <Wifi className="w-4 h-4 text-green-400" />
      <span className="text-green-400 text-sm">Connecté</span>
    </div>
  );
};