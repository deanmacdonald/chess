# syntax=docker/dockerfile:1.4

# 🐍 Base image: lightweight Python 3.11
FROM python:3.11-slim AS base

# 👤 Create non-root user for security
RUN useradd -m appuser

# 📁 Set working directory
WORKDIR /app

# 🛠️ Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    libpq-dev \
    curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 📦 Install Python dependencies
COPY requirements-dev.txt ./requirements.txt
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    python -c "import flask" && \
    pip check

# 📂 Copy backend and frontend source files
COPY backend/ ./backend/
COPY frontend/src/ ./src/

# 🔊 Expose port for Flask app
EXPOSE 8000

# 👤 Switch to non-root user
USER appuser

# 🚀 Run the application
CMD ["python", "src/main.py"]

