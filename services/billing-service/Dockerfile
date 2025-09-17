FROM node:18
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 4006
CMD ["yarn", "start"]
