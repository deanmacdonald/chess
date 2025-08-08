# ✅ Use official Python image (updated to 3.12)
FROM python:3.12-slim

# 🧼 Set environment variables to reduce Python overhead
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 📁 Set working directory
WORKDIR /app

# 🐍 Install system dependencies (optional: for packages like numpy, pillow, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 📦 Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 📦 Copy the rest of the app
COPY . .

# 🌐 Expose port
EXPOSE 5000

# 🚀 Use Gunicorn for production
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
