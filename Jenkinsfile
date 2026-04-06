pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "myadmin12/devops-node-app"
        DOCKER_TAG = "${env.BUILD_ID}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Code Quality Scan') {
            environment {
                scannerHome = tool 'sonar-scanner'
            }
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh "${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=devops-node-app \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://20.197.56.175:9000"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker Image..."
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Trivy Security Scan') {
            steps {
                script {
                    echo "Running Trivy Scan..."
                    // We check for CRITICAL vulnerabilities. If found, pipeline FAILS (exit code 1)
                    sh "trivy image --severity CRITICAL --exit-code 1 ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    echo "Deploying Container..."
                    // Stop and remove existing container if it exists
                    sh "docker rm -f devops-node-app || true"
                    // Run the new container
                    sh "docker run -d -p 3000:3000 --name devops-node-app ${DOCKER_IMAGE}:latest"
                }
            }
        }
    }
}