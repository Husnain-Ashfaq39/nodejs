pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME = 'husnain239/nodejs-app'
        DOCKER_IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Docker') {
            steps {
                script {
                    sh '''
                    if ! [ -x "$(command -v docker)" ]; then
                      echo 'Docker not found, installing...'
                      curl -fsSL https://get.docker.com -o get-docker.sh
                      sh get-docker.sh
                      sudo usermod -aG docker jenkins
                      echo 'Docker installed successfully'
                    else
                      echo 'Docker already installed'
                    fi
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG .'
                sh 'docker tag $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG $DOCKER_IMAGE_NAME:latest'
            }
        }
        
        stage('Login to Docker Hub') {
            steps {
                sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG'
                sh 'docker push $DOCKER_IMAGE_NAME:latest'
            }
        }
        
        stage('Cleanup') {
            steps {
                sh 'docker rmi $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG'
                sh 'docker rmi $DOCKER_IMAGE_NAME:latest'
                sh 'docker logout'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
} 