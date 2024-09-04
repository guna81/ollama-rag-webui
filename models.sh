#!/bin/bash
# Start the Ollama server
ollama serve &

# Pull the required models
ollama pull llama3:8b

# Start the Ollama server
#ollama serve
