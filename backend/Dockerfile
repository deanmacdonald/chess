# 🐍 Use official Python image (slim variant for smaller size)
FROM python:3.12-slim

# 🧼 Environment variables to reduce Python overhead
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_ROOT_USER_ACTION=ignore

# 📁 Set working directory
WORKDIR /app

# 🛠️ Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    gcc \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 📦 Install Python dependencies
COPY requirements.txt .
RUN python -m pip install --upgrade pip setuptools wheel \
    && pip install -r requirements.txt

# 📄 Copy application code
COPY . .

# 🧪 Optionally run tests (comment out if not needed)
# RUN pytest

# 🔐 Create non-root user for security
RUN useradd --create-home appuser
USER appuser

# 🌐 Expose port (adjust if needed)
EXPOSE 5000

# 🚀 Start app with Gunicorn (adjust path to your app)
CMD ["gunicorn", "backend.app:app", "--bind", "0.0.0.0:5000", "--workers", "4", "--threads", "2", "--timeout", "120"]
