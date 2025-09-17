# Use official Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
