pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "chess-app:${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Test') {
      steps {
        sh 'docker run $DOCKER_IMAGE npm test'
      }
    }

    stage('Push to Registry') {
      steps {
        sh 'docker tag $DOCKER_IMAGE registry.example.com/chess-app:$BUILD_NUMBER'
        sh 'docker push registry.example.com/chess-app:$BUILD_NUMBER'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl set image deployment/chess-app chess-app=registry.example.com/chess-app:$BUILD_NUMBER'
      }
    }
  }

  post {
    failure {
      echo 'Build failed. Notifying team...'
    }
  }
}
