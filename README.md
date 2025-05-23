# Simple Express Web Application

A basic Node.js Express web application with a simple frontend.

## Features

- Express server with API endpoints
- Static file serving
- Simple frontend with HTML, CSS, and JavaScript
- API interaction example

## Installation

1. Clone this repository or download the files
2. Install dependencies:

```
npm install
```

## Running the Application

### Development mode (with auto-reload)

```
npm run dev
```

### Production mode

```
npm start
```

Then open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `app.js` - Main Express server file
- `public/` - Static files (HTML, CSS, JS)
  - `index.html` - Main webpage
  - `styles.css` - CSS styles
  - `script.js` - Frontend JavaScript
- `package.json` - Project configuration and dependencies 
- `Dockerfile` - Docker container configuration
- `Jenkinsfile` - Jenkins CI/CD pipeline definition

## CI/CD Pipeline

This project includes a CI/CD pipeline using Jenkins and Docker:

1. When code is pushed to GitHub, Jenkins automatically detects the change
2. Jenkins builds a Docker image from the application code
3. The image is pushed to Docker Hub repository
4. Old Docker images are cleaned up

### Setting up Jenkins

1. Install Jenkins and the necessary plugins:
   - Git plugin
   - Docker plugin
   - Pipeline plugin
   - Credentials Binding plugin

2. Create a Jenkins pipeline job:
   - Select "Pipeline" as the job type
   - Configure SCM to point to your GitHub repository
   - Set the "Script Path" to "Jenkinsfile"

3. Create Docker Hub credentials in Jenkins:
   - Go to Jenkins > Manage Jenkins > Credentials > System > Global credentials
   - Add credentials with ID "docker-hub-credentials"
   - Use your Docker Hub username and password/token

4. Update the Jenkinsfile:
   - Change "yourusername/nodejs-app" to your actual Docker Hub username and desired image name 