from flask import Flask, request, jsonify, Response
from chat import load_documents, chat
from llm_rag.inference import inference

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def index():
    return "Hello, World!"


@app.route("/load-docs", methods=["POST"])
def load_docs_api():
    try:
        # Get user message from the request body
        files = request.files['files']
        result = load_documents(files)

        return jsonify({
            "data": result
        }), 200
    except Exception as e:
        print("error", e)
        return jsonify({
            "error": True
        })

@app.route("/qa", methods=["POST"])
def chat_api():
    try:
        # Get user message from the request body
        question = request.json['question']
        result = chat(question)
        
        return Response(result, content_type='application/json')
        # return Response(inference(question), content_type='text/plain')
    except Exception as e:
        print("error", e)
        return jsonify({
            "error": True
        })
    

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=8080)