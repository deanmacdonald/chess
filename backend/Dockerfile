# 🐍 Use official Python image
FROM python:3.12-slim

# 🧼 Set environment variables to reduce Python overhead
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 📁 Set working directory
WORKDIR /app

# 🛠️ Install system dependencies (for packages like numpy, pillow, psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 📦 Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# 📄 Copy the rest of the backend code
COPY . .

# 🔥 Expose port (adjust if needed)
EXPOSE 5000

# 🚀 Run the app (adjust for your framework)
CMD ["python", "app.py"]
