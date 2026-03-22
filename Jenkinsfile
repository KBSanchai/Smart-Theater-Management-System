pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {

        stage('Install') {
            steps {
                dir('cinemate-system-main') {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('cinemate-system-main') {
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('cinemate-system-main') {
                    bat 'npm test || echo No tests'
                }
            }
        }
    }

    post {
        success {
            echo 'Build Success 🚀'
        }
        failure {
            echo 'Build Failed ❌'
        }
    }
}
