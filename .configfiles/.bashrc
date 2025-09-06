# Set XDG_RUNTIME_DIR for graphical apps
export XDG_RUNTIME_DIR="$HOME/.xdg_runtime"
mkdir -p "$XDG_RUNTIME_DIR" 2>/dev/null

# Optional: Set DISPLAY if using X server (e.g., XServer XSDL)
# export DISPLAY=:0

# Pygame dummy drivers to suppress errors
export SDL_VIDEODRIVER="dummy"
export SDL_AUDIODRIVER="dummy"
export XDG_RUNTIME_DIR=/run/user/$(id -u)
export DISPLAY=:0
export SDL_AUDIODRIVER="dummy"
