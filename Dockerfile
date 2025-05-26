# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine AS runtime
WORKDIR /app

# Install static file server
RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

# Serve the frontend build
CMD ["serve", "-s", "dist", "-l", "3000"]
