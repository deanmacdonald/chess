# 1. Use the official Node 20 image (recommended for Next.js 14)
FROM node:20-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies separately for better caching
COPY package.json package-lock.json* ./
RUN npm install

# 4. Copy the rest of your project
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Use a lightweight runtime image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only what is needed for production
COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public

# 7. Expose port 3000
EXPOSE 3000

# 8. Start Next.js in production mode
CMD ["npm", "start"]
