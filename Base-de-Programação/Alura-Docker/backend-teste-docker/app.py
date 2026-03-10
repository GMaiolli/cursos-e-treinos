from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Isso permite que o frontend acesse a API

@app.route('/api/dados')
def get_dados():
    return jsonify({
        "status": "sucesso",
        "mensagem": "Requisição recebida pelo Docker!",
        "autor": "Gabriel Maiolli"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)