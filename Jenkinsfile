pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test || echo No tests'
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
