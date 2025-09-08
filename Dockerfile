# 🐍 Base image with Python 3.11
FROM python:3.11-slim

# 📁 Set working directory
WORKDIR /app

# 🛠️ Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 📦 Upgrade pip and install Python dependencies
COPY requirements/requirements-dev.txt ./requirements-dev.txt
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements-dev.txt

# 📂 Copy project files
COPY . .

# 🔊 Optional: expose a port if your app uses networking
# EXPOSE 8000

# 🚀 Run your app
CMD ["python", "src/main.py"]

