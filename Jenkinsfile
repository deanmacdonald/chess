pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "chess-app:${env.BUILD_NUMBER}"
    REGISTRY = "registry.example.com"
    FULL_IMAGE = "${REGISTRY}/chess-app:${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        echo "📦 Checking out source code..."
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        echo "🐳 Building Docker image: ${DOCKER_IMAGE}"
        sh "docker build -t ${DOCKER_IMAGE} ."
      }
    }

    stage('Run Tests') {
      steps {
        echo "🧪 Running tests inside container..."
        sh "docker run --rm ${DOCKER_IMAGE} pytest"
      }
    }

    stage('Push to Registry') {
      steps {
        echo "🚀 Tagging and pushing image to registry..."
        sh "docker tag ${DOCKER_IMAGE} ${FULL_IMAGE}"
        sh "docker push ${FULL_IMAGE}"
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        echo "📦 Updating Kubernetes deployment..."
        sh "kubectl set image deployment/chess-app chess-app=${FULL_IMAGE}"
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline completed successfully!"
    }
    failure {
      echo "❌ Build failed. Notifying team..."
      // You can add Slack/email notifications here
    }
  }
}
