# ─ Base Image ─────────────────────────────────────────────────────────────
FROM python:3.11-slim

# ─ Metadata Labels ───────────────────────────────────────────────────────
LABEL maintainer="Dean MacDonald <deanmacdonald96@msn.com>"
LABEL description="Chess game built with Pygame and Python 3.11"
LABEL version="1.0"

# ─ Set Working Directory ──────────────────────────────────────────────────
WORKDIR /app

# ─ Install System Packages ────────────────────────────────────────────────
RUN apt-get update && apt-get install -y \
    build-essential \
    libgl1 \
    libglx-mesa0 \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ─ Python Environment Variables ───────────────────────────────────────────
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# ─ Install Python Dependencies ────────────────────────────────────────────
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ─ Copy Application Files ─────────────────────────────────────────────────
COPY src/ ./src/
COPY public/assets/ ./public/assets/

# ─ Expose Port (optional if using a web interface) ────────────────────────
# EXPOSE 8000

# ─ Run the Application ────────────────────────────────────────────────────
CMD ["python", "src/main.py"]

