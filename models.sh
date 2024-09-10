#!/bin/bash

# Start the Ollama server (in foreground)
ollama serve &

# Pull the required model
echo "Pulling model llama3:8b..."
ollama pull llama3:8b
ollama pull nomic-embed-text

# Keep the container running
wait