pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'git@github.com:deanmacdonald/chess.git'
            }
        }
        stage('Build') {
            steps {
                sh 'make build' // Adjust to your actual build command
            }
        }
        stage('Test') {
            steps {
                sh 'make test' // Adjust to your actual test command
            }
        }
        stage('Deploy') {
            steps {
                sh 'make deploy' // Adjust to your actual deployment command
            }
        }
    }
}

