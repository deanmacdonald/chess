pipeline {
    agent {
        docker {
            image "${DOCKER_IMAGE}"
            args '-u root'
        }
    }

    environment {
        DOCKER_IMAGE = 'deanmacdonald/chess-app'
        DOTNET_ROOT = '/usr/share/dotnet' // optional path hint
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/deanmacdonald/chess.git', branch: 'main'
            }
        }

        stage('Setup Python Environment') {
            steps {
                sh '''
                    python3 -m venv venv
                    . venv/bin/activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Run Python Tests') {
            steps {
                sh '''
                    . venv/bin/activate
                    pytest
                '''
            }
        }

        stage('Build .NET Project') {
            steps {
                sh '''
                    dotnet restore
                    dotnet build --no-restore
                '''
            }
        }

        stage('Run .NET Tests') {
            steps {
                sh 'dotnet test --no-build --verbosity normal'
            }
        }

        stage('Post-Build Message') {
            steps {
                echo '✅ Build and tests completed successfully!'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline finished without errors.'
        }
        failure {
            echo '🔥 Something went wrong. Check the logs for details.'
        }
    }
}

