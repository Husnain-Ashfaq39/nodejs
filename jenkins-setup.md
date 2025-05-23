# Jenkins Setup for Docker-based CI/CD

This guide helps you set up Jenkins for a Docker-based CI/CD pipeline.

## Prerequisites

- A server with sufficient resources (2+ CPU cores, 4+ GB RAM)
- Docker installed on the server
- Git installed on the server
- Internet connectivity for downloading plugins and images

## Step 1: Install Jenkins

### Using Docker

```bash
# Create a network for Jenkins
docker network create jenkins

# Run Jenkins controller
docker run \
  --name jenkins-controller \
  --restart=on-failure \
  --detach \
  --network jenkins \
  --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client \
  --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-docker-certs:/certs/client:ro \
  jenkins/jenkins:lts
```

### Or Install Directly on Host

1. Add the Jenkins repository key:
```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
```

2. Add the Jenkins repository:
```bash
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
```

3. Update and install Jenkins:
```bash
sudo apt-get update
sudo apt-get install jenkins
```

## Step 2: Initial Jenkins Setup

1. Access Jenkins at `http://your-server-ip:8080`
2. Get the initial admin password:
   ```bash
   # If using Docker
   docker exec jenkins-controller cat /var/jenkins_home/secrets/initialAdminPassword
   
   # If installed directly
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Install recommended plugins
4. Create an admin user
5. Configure Jenkins URL

## Step 3: Install Required Plugins

Go to "Manage Jenkins" > "Manage Plugins" > "Available" and install:

- Docker plugin
- Docker Pipeline
- Git Integration
- Pipeline
- GitHub Integration
- Credentials Binding

## Step 4: Configure Docker Integration

### Option 1: Docker-in-Docker

Allow Jenkins to run Docker commands:

```bash
# Add jenkins user to docker group (if installed directly)
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Option 2: Docker Socket Binding (if using Docker)

```bash
docker run \
  --name jenkins-controller \
  --restart=on-failure \
  --detach \
  --network jenkins \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

## Step 5: Configure Docker Hub Credentials

1. Go to "Manage Jenkins" > "Manage Credentials" > "System" > "Global credentials"
2. Click "Add Credentials"
3. Select "Username with password"
4. Enter your Docker Hub username and password/token
5. Set ID as "docker-hub-credentials"
6. Click "OK"

## Step 6: Create a Pipeline Job

1. Click "New Item"
2. Enter a name and select "Pipeline"
3. In the configuration:
   - Under "General", select "GitHub project" and enter your repo URL
   - Under "Build Triggers", select "GitHub hook trigger for GITScm polling"
   - Under "Pipeline", select "Pipeline script from SCM"
   - Set SCM to "Git"
   - Enter your repository URL
   - Specify branch (e.g., "*/main")
   - Set "Script Path" to "Jenkinsfile"
4. Click "Save"

## Step 7: Test the Pipeline

1. Trigger a manual build to verify the pipeline works
2. Check the console output for any errors
3. Verify the Docker image is built and pushed correctly

## Additional Configuration

- Set up backup for Jenkins data
- Configure email notifications for build results
- Add more security measures as needed 