# Stage 1: Build
FROM node:current-alpine3.22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:current-alpine3.22

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm ci --omit=dev

EXPOSE 8080

CMD ["node", "dist/server.js"]