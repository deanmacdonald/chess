#!/bin/bash

# Podman build script for target "myapp"
# Based on docker-bake.hcl configuration

echo "🔧 Starting build for image: myapp:latest"

podman build \
  -f Dockerfile \
  -t myapp:latest \
  .

if [ $? -eq 0 ]; then
  echo "✅ Build complete: myapp:latest"
else
  echo "❌ Build failed. Check the Dockerfile and dependencies."
  exit 1
fi

