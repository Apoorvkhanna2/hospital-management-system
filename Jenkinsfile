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
                    docker.build("apoorv468/hospital-backend:${env.BUILD_NUMBER}", "./backend")
                    docker.build("apoorv468/hospital-frontend:${env.BUILD_NUMBER}", "./frontend")
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image("apoorv468/hospital-backend:${env.BUILD_NUMBER}").push()
                        docker.image("apoorv468/hospital-frontend:${env.BUILD_NUMBER}").push()
                    }
                }
            }
        }
        
        stage('Success') {
            steps {
                sh 'echo "🎉 CI/CD Pipeline Completed Successfully!"'
                sh 'echo "Docker images pushed to Docker Hub"'
            }
        }
    }
    
    post {
        always {
            echo "Pipeline execution completed"
        }
        success {
            echo "✅ Hospital Management System CI/CD completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed - check logs above"
        }
    }
}