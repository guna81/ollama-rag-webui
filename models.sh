#!/bin/bash

# Pull the required models
echo "Pulling model llama3:8b..."
ollama pull llama3:8b
echo "Pulling model nomic-embed-text..."
ollama pull nomic-embed-text

echo "Starting Ollama server..."
# Use exec to replace the shell with the ollama serve process
exec ollama serve