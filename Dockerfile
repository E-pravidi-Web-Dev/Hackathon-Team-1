# Build stage
FROM node:20-slim AS builder

# Install necessary packages for DNS resolution
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (production only for smaller node_modules)
ENV NODE_ENV=production
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:20-slim

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=8080
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

EXPOSE 8080

CMD ["npm", "start"]