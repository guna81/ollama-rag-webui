#!/bin/bash

# Start the Ollama server in the background
ollama serve &

# Pull the required model
echo "Pulling model llama3:8b..."
ollama pull llama3:8b
