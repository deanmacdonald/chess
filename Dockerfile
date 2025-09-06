# syntax=docker/dockerfile:1.4

# ----------- Builder Stage -----------
FROM python:3.11-slim AS builder
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and build tools
RUN pip install --upgrade pip setuptools wheel

# Copy wheel from build context
COPY --from=dist / ./dist

# Install wheel if it exists
RUN if [ -f ./dist/chess-0.1.0-py3-none-any.whl ]; then \
        pip install ./dist/chess-0.1.0-py3-none-any.whl; \
    fi

# Copy requirements
COPY requirements.txt requirements-dev.txt ./

# Install dependencies
RUN pip install -r requirements.txt && \
    pip install -r requirements-dev.txt

# ----------- Final Stage -----------
FROM python:3.11-slim AS final
WORKDIR /app

# Install runtime system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and build tools
RUN pip install --upgrade pip setuptools wheel

# Copy everything from builder
COPY --from=builder /app /app

# Default command (adjust as needed)
CMD ["python"]

