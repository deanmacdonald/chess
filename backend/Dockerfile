FROM node:18-alpine

WORKDIR /app
COPY backend-node/package*.json ./
RUN npm install
COPY backend-node/ ./

EXPOSE 3000
CMD ["npm", "start"]
