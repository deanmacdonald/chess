# 🎯 Base image with graphical capabilities
FROM ubuntu:22.04

# 🛠 Install packages needed for X server and graphics
RUN apt-get update && apt-get install -y \
    xorg \
    xserver-xorg \
    x11-xserver-utils \
    libgl1-mesa-glx \
    libglu1-mesa \
    libxcb1-dev \
    libx11-dev \
    libxext-dev \
    libxrandr-dev \
    libxinerama-dev \
    libxkbcommon-x11-0 \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# 🧪 Optional: Install pygame if needed for chess GUI
RUN pip3 install pygame

# 🚧 Create user for safer container execution
RUN useradd -m xuser
USER xuser
WORKDIR /home/xuser

# 🪞 X server-related env config
ENV DISPLAY=:0

# 🔁 Entry point (override as needed)
CMD [ "bash" ]

