pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE_BACKEND = 'apoorv468/hospital-backend'
        DOCKER_IMAGE_FRONTEND = 'apoorv468/hospital-frontend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Apoorvkhanna2/hospital-management-system.git'
                sh 'ls -la'
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'npm test -- --coverage --watchAll=false --passWithNoTests'
                        }
                    }
                    post {
                        always {
                            junit 'backend/test-results.xml'
                            publishHTML(target: [
                                reportDir: 'backend/coverage/lcov-report',
                                reportFiles: 'index.html',
                                reportName: 'Backend Coverage Report'
                            ])
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm test -- --coverage --watchAll=false --passWithNoTests'
                        }
                    }
                    post {
                        always {
                            junit 'frontend/test-results.xml'
                            publishHTML(target: [
                                reportDir: 'frontend/coverage/lcov-report',
                                reportFiles: 'index.html',
                                reportName: 'Frontend Coverage Report'
                            ])
                        }
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    sh 'npm audit --audit-level moderate || true'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}", "./backend")
                    docker.build("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}", "./frontend")
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}").push()
                        // Also push as latest
                        docker.image("${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}").push('latest')
                        docker.image("${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                script {
                    sh '''
                    docker-compose -f docker-compose.staging.yml down
                    docker-compose -f docker-compose.staging.yml up -d
                    '''
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                script {
                    sh 'sleep 30' // Wait for services to start
                    sh 'curl -f http://localhost:5000/health || exit 1'
                    sh 'curl -f http://localhost:3000 || exit 1'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh '''
                    kubectl apply -f kubernetes/
                    kubectl rollout restart deployment/hospital-backend
                    kubectl rollout restart deployment/hospital-frontend
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
            // Optional: Email notifications
            // emailext (
            //     subject: "Build Result: ${currentBuild.fullDisplayName}",
            //     body: "Build ${currentBuild.result}: ${env.BUILD_URL}",
            //     to: "your-email@company.com"
            // )
        }
        success {
            echo "✅ Hospital Management System deployed successfully!"
            // Optional: Slack notification
            // slackSend channel: '#deployments', 
            //          message: "✅ Hospital Management System deployed successfully! Build: ${env.BUILD_URL}"
        }
        failure {
            echo "❌ Hospital Management System deployment failed!"
            // Optional: Slack notification  
            // slackSend channel: '#deployments',
            //          message: "❌ Hospital Management System deployment failed! Build: ${env.BUILD_URL}"
        }
    }
}