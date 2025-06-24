votes = []

def save_vote(data):
    votes.append(data)

def calculate_scores():
    # Exemple de score simple : 10 points par joueur
    from persona_logic import get_all_personas
    scores = {}
    for player in get_all_personas():
        name = player.get("name", "Inconnu")
        scores[name] = 10  # Score fixe pour démonstration
    return scores