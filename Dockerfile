# Start from an official Python image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy your project files into container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port (adjust if you run a server)
EXPOSE 5000

# Run your app
CMD ["python", "main.py"]
