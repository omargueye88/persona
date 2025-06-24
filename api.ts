const API_BASE_URL = 'http://localhost:5000/api';

export interface PersonaData {
  name: string;
  age: string;
  profession: string;
  traits: string;
  playerId: string;
}

export interface VoteData {
  voterId: string;
  targetId: string;
  guess: string;
  gameId: string;
}

export interface MessageData {
  playerId: string;
  playerName: string;
  message: string;
  timestamp: string;
}

export const apiService = {
  // ✅ Créer une nouvelle persona
  async createPersona(personaData: PersonaData) {
    try {
      const response = await fetch(`${API_BASE_URL}/persona`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaData),
      });

      const result = await response.json().catch(() => ({}));
      console.log('Persona creation response:', response.status, result);

      if (!response.ok) {
        throw new Error(result.message || 'Échec de la création du persona');
      }

      return result;
    } catch (error) {
      console.error('Error creating persona:', error);
      throw error;
    }
  },

  // ✅ Envoyer un vote
  async submitVote(gameId: string, voteData: VoteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/game/${gameId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      });

      const result = await response.json().catch(() => ({}));
      console.log('Vote submission response:', response.status, result);

      if (!response.ok) {
        throw new Error(result.message || 'Échec de l\'envoi du vote');
      }

      return result;
    } catch (error) {
      console.error('Error submitting vote:', error);
      throw error;
    }
  },

  // ✅ Obtenir les scores du jeu
  async getScores(gameId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/game/${gameId}/scores`);

      const result = await response.json().catch(() => ({}));
      console.log('Get scores response:', response.status, result);

      if (!response.ok) {
        throw new Error(result.message || 'Échec de la récupération des scores');
      }

      return result;
    } catch (error) {
      console.error('Error getting scores:', error);
      throw error;
    }
  },
};
