from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit

from persona_logic import save_persona
from game_logic import save_vote, calculate_scores

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

messages = []

@app.route('/api/persona', methods=['POST'])
def create_persona():
    data = request.json
    save_persona(data)
    return jsonify({"status": "success", "persona": data}), 200

@app.route('/api/vote', methods=['POST'])
def vote():
    data = request.json
    save_vote(data)
    return jsonify({"status": "vote_saved"}), 200

@app.route('/api/score', methods=['GET'])
def get_scores():
    scores = calculate_scores()
    return jsonify(scores)

@socketio.on('send_message')
def handle_message(data):
    messages.append(data)
    emit('receive_message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)