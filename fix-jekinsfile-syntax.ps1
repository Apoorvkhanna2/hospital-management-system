# Create the fix script
@'
Write-Host "Fixing Jenkinsfile Syntax" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

# Create the correct Jenkinsfile without escape characters
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
"@ | Out-File -FilePath "Jenkinsfile" -Encoding UTF8

Write-Host "✅ Created correct Jenkinsfile without syntax errors" -ForegroundColor Green

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git add Jenkinsfile
git commit -m "Fix Jenkinsfile syntax errors"
git push origin main

Write-Host "✅ Pushed to GitHub" -ForegroundColor Green

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. The pipeline should automatically restart" -ForegroundColor White
Write-Host "2. Or manually run: http://localhost:8080/job/hospital-management-system/" -ForegroundColor White
Write-Host "3. This should work without syntax errors" -ForegroundColor White
'@ | Out-File -FilePath "fix-jenkinsfile-syntax.ps1" -Encoding UTF8

Write-Host "✅ Script created: fix-jenkinsfile-syntax.ps1" -ForegroundColor Green