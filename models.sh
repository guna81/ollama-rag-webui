#!/bin/bash

# Start the Ollama server in the background
ollama serve &

# Wait for the Ollama server to start up
echo "Waiting for Ollama server to start..."
while ! nc -z localhost 11434; do   
  sleep 1 # wait for 1 second before checking again
done
echo "Ollama server started."

# Pull the required model
echo "Pulling model llama3:8b..."
if ollama pull llama3:8b; then
  echo "Model llama3:8b pulled successfully."
else
  echo "Failed to pull model llama3:8b." >&2
  exit 1
fi

# Keep the script running to ensure the container stays up
wait
