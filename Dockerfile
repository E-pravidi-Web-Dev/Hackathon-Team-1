# Use an official lightweight base image
FROM ubuntu:22.04

# Set environment variables
ENV PORT=8080

# Expose the port Cloud Run will listen on
EXPOSE 8080

# Add your build and run instructions here
# Example:
# COPY . /app
# WORKDIR /app
# RUN <build-commands>
# CMD ["<your-start-command>"]

# Participants: Add your own build and run steps above!
