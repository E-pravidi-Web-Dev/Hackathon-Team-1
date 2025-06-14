# Use official Node.js LTS image
FROM node:20-slim

# Set environment variables
ENV PORT=8080

# Set working directory
WORKDIR /app

# --- Build instructions start ---
# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies if package.json exists
RUN if [ -f package.json ]; then npm install --omit=dev; fi
# --- Build instructions end ---

# Copy all other files
COPY . .

# Expose the port Cloud Run expects
EXPOSE 8080

# Start the app (participants should ensure their app listens on port 8080)
CMD ["npm", "start"]
