
pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Automated Tests') {
            steps {
                bat 'npm run test:ci'
            }
        }

        stage('Package Application') {
            steps {
                bat 'if exist artifacts rmdir /s /q artifacts'
                bat 'mkdir artifacts'
                bat 'npm pack --pack-destination artifacts'
            }
        }
    }

    post {
        success {
            archiveArtifacts(
                artifacts: 'artifacts/*.tgz',
                fingerprint: true
            )
        }

        always {
            echo 'AgriPulse CI pipeline execution completed.'
        }
    }
}
