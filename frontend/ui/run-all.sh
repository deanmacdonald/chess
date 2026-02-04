#!/data/data/com.termux/files/usr/bin/bash

# 1. Start backend inside Ubuntu
proot-distro login ubuntu -- bash -c "
  cd /data/data/com.termux/files/home/chess/backend &&
  nohup python3 main.py > backend.log 2>&1 &
"

# 2. Start Cloudflare Tunnel inside Ubuntu
proot-distro login ubuntu -- bash -c "
  nohup cloudflared tunnel run > tunnel.log 2>&1 &
"

# 3. Start frontend in Termux
npm run dev
