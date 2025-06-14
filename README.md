# Hackathon Cloud Run Deployment Template

This repository provides a generic setup for deploying your application to Google Cloud Run using GitHub Actions and Docker. It is designed for hackathon participants to quickly get started with CI/CD and GCP deployment.

## Files Included
- `Dockerfile`: Minimal base. **You must add your own build and run instructions.**
- `.github/workflows/deploy-cloudrun.yml`: GitHub Actions workflow for building and deploying to Cloud Run using the `organickarnali` registry.

## How to Use
1. **Edit the Dockerfile**
   - Add your own build steps, dependencies, and start command.
   - Example (replace with your own):
     ```Dockerfile
     # ...existing code...
     COPY . /app
     WORKDIR /app
     RUN npm install
     CMD ["npm", "start"]
     # ...existing code...
     ```


3. **Push to `main` branch**
   - The workflow will automatically build and deploy your app to Cloud Run.

## Notes
- The Dockerfile is intentionally minimal. You must add your own build and run steps.
- The default port is `8080` (Cloud Run standard).


Happy hacking!
