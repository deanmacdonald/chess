pipeline {
    agent {
        docker {
            image "${DOCKER_IMAGE}"
            args '-u root' // allows root access if needed
        }
    }

    environment {
        DOCKER_IMAGE = 'deanmacdonald/chess-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/deanmacdonald/chess.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    python3 -m venv venv
                    source venv/bin/activate
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'source venv/bin/activate && pytest'
            }
        }

        stage('Build') {
            steps {
                sh 'echo "Build completed!"'
            }
        }
    }
}

