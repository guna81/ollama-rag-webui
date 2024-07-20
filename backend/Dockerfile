# Specify the base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
# RUN pip install --no-cache-dir -r requirements.txt
RUN pip install -r requirements.txt

# Copy the application code
COPY . .

ENV FLASK_APP "app.py"

# Expose the port
EXPOSE 8080

# Define the command to run the application
# CMD ["python", "app.py"]
CMD [ "python3.10", "-m" , "flask", "run", "--host=0.0.0.0", "--debug"]