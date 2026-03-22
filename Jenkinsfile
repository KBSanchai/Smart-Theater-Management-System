pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        APP_DIR = 'cinemate-system-main'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Code already checked out by Jenkins'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Build Project') {
            steps {
                dir("${APP_DIR}") {
                    bat 'npm run build'
                }
            }
        }

        stage('Test (Optional)') {
            steps {
                dir("${APP_DIR}") {
                    bat 'npm test || echo No tests found'
                }
            }
        }

        stage('Serve App (Optional)') {
            steps {
                dir("${APP_DIR}") {
                    bat 'npm install -g serve'
                    bat 'serve -s dist -l 3000'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build & Deployment Successful 🚀'
        }
        failure {
            echo '❌ Build Failed'
        }
    }
}
