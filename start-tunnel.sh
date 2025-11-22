#!/data/data/com.termux/files/usr/bin/bash

# CONFIGURATION
PORT=3000
LOG_FILE="tunnel.log"
HEALTH_ROUTE="/health"

# STEP 1: Start backend in background
echo "🚀 Starting backend on port $PORT..."
yarn start &

# Wait a moment for server to boot
sleep 3

# STEP 2: Launch LocalTunnel and capture URL
echo "🌐 Launching LocalTunnel..."
lt --port $PORT | tee $LOG_FILE | while read line; do
  if echo "$line" | grep -q "https://"; then
    URL=$(echo "$line" | grep -o 'https://[^ ]*')
    echo "🔗 Public URL: $URL"

    # STEP 3: Copy to clipboard
    echo "$URL" | termux-clipboard-set
    echo "📋 Copied to clipboard"

    # STEP 4: Optional health check
    echo "🧪 Pinging $URL$HEALTH_ROUTE..."
    curl -s "$URL$HEALTH_ROUTE" && echo -e "\n✅ Health check passed" || echo -e "\n⚠️ Health check failed"

    break
  fi
done
