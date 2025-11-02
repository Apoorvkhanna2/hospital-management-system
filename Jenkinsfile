pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Apoorvkhanna2/hospital-management-system.git'
                sh 'ls -la'
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    docker.build(\"apoorv468/hospital-backend:\\", \"./backend\")
                    docker.build(\"apoorv468/hospital-frontend:\\", \"./frontend\")
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image(\"apoorv468/hospital-backend:\\").push()
                        docker.image(\"apoorv468/hospital-frontend:\\").push()
                    }
                }
            }
        }
        
        stage('Success') {
            steps {
                sh 'echo \"ðŸŽ‰ CI/CD Pipeline Completed Successfully!\"'
                sh 'echo \"Docker images pushed to: https://hub.docker.com/r/apoorv468/\"'
            }
        }
    }
}
