stage('Run App') {
    steps {
        dir('cinemate-system-main') {
            bat 'npm install -g serve'
            bat 'serve -s dist -l 3000'
        }
    }
}
