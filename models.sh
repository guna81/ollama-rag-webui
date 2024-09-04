#!/bin/bash

# Start the Ollama server in the background
ollama serve &

# Pull the required model
echo "Pulling model llama3:8b..."
if ollama pull llama3:8b; then
  echo "Model llama3:8b pull initiated."
else
  echo "Failed to initiate model pull for llama3:8b." >&2
  exit 1
fi

# Wait for the model to become available
echo "Waiting for model llama3:8b to become available..."
while ! ollama list | grep -q "llama3:8b"; do
  sleep 1
done
echo "Model llama3:8b is now available."

# Keep the script running to ensure the container stays up
wait
