# Use official Node.js LTS image
FROM node:20-slim

# Set environment variables
ENV PORT=8080

# Set working directory
WORKDIR /app

# --- Build instructions start ---
# Add your build steps here (e.g., install dependencies, build assets, etc.)
# --- Build instructions end ---

# Copy server and static files
COPY server.js ./
COPY index.html ./

# Expose the port Cloud Run expects
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
