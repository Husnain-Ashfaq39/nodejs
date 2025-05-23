# Setting Up Docker in Jenkins

Based on your Jenkins build logs, you're running into a common issue: Docker is not installed or accessible to your Jenkins user. Here are two approaches to solve this:

## Option 1: Install Docker within Jenkins Container

If your Jenkins is running in a container, modify your container setup to include Docker:

```bash
# Run Jenkins with Docker-in-Docker capabilities
docker run \
  --name jenkins \
  --restart=on-failure \
  --detach \
  --privileged \
  --publish 8080:8080 \
  --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

Note the important parts:
- `--privileged` flag
- Mounting the Docker socket with `-v /var/run/docker.sock:/var/run/docker.sock`

## Option 2: Install Docker on Jenkins Host

If your Jenkins is running directly on a host:

1. Install Docker:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

2. Add the jenkins user to the docker group:
```bash
sudo usermod -aG docker jenkins
```

3. Restart Jenkins:
```bash
sudo systemctl restart jenkins
```

## Option 3: Use Jenkins Docker Agent

If you can't install Docker directly, modify your Jenkinsfile to use a Docker agent:

```groovy
pipeline {
    agent {
        docker {
            image 'docker:dind'
            args '--privileged'
        }
    }
    // rest of your pipeline
}
```

## Option 4: Use Docker-in-Docker with Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3'
services:
  jenkins:
    image: jenkins/jenkins:lts
    privileged: true
    user: root
    ports:
      - 8080:8080
      - 50000:50000
    container_name: jenkins
    volumes:
      - jenkins-data:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker

volumes:
  jenkins-data:
```

Run with:
```bash
docker-compose up -d
```

## Troubleshooting

If you're still seeing "docker: not found" after implementing these solutions:

1. Check Docker installation inside Jenkins container:
```bash
docker exec -it jenkins bash
which docker
```

2. If Docker binary exists but permissions are wrong:
```bash
docker exec -it jenkins bash
chmod +x /usr/bin/docker
```

3. Verify Docker socket permissions:
```bash
docker exec -it jenkins bash
ls -la /var/run/docker.sock
``` 