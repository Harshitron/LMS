# Development stage
FROM node:18-alpine AS development

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine AS build

WORKDIR /usr/src/server

COPY package*.json ./
RUN npm install --production --legacy-peer-deps
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
