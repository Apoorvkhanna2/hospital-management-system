Write-Host "Fixing npm not found issue in Jenkins" -ForegroundColor Green

# Create Jenkinsfile that builds Docker images directly (no npm needed)
@"
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
                    docker.build(\"apoorv468/hospital-backend:\${env.BUILD_NUMBER}\", \"./backend\")
                    docker.build(\"apoorv468/hospital-frontend:\${env.BUILD_NUMBER}\", \"./frontend\")
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image(\"apoorv468/hospital-backend:\${env.BUILD_NUMBER}\").push()
                        docker.image(\"apoorv468/hospital-frontend:\${env.BUILD_NUMBER}\").push()
                    }
                }
            }
        }
        
        stage('Success') {
            steps {
                sh 'echo \"🎉 CI/CD Pipeline Completed Successfully!\"'
                sh 'echo \"Docker images pushed to: https://hub.docker.com/r/apoorv468/\"'
            }
        }
    }
}
"@ | Out-File -FilePath "Jenkinsfile" -Encoding UTF8

Write-Host "✅ Created Jenkinsfile that builds Docker images directly" -ForegroundColor Green

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git add Jenkinsfile
git commit -m "Fix Jenkins pipeline - build Docker images directly"
git push origin main

Write-Host "✅ Pushed to GitHub" -ForegroundColor Green

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Make sure Docker Hub credentials are added in Jenkins" -ForegroundColor White
Write-Host "2. Run the pipeline: http://localhost:8080/job/hospital-management-system/" -ForegroundColor White
Write-Host "3. This will build and push Docker images without needing npm" -ForegroundColor White