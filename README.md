# 🐳 Dockerized Express Login App

A simple Node.js + Express application that validates a username and password submitted through a form.  
The app is fully containerized with Docker and automatically deployed to an AWS EC2 instance using GitHub Actions.

---

## Project Reference

The project template followed: https://roadmap.sh/projects/dockerized-service-deployment

---

## 🚀 Features

- Express server with `/` and `/secret` routes
- Login form served via `/secret` (GET)
- Environment-based credential verification
- Docker image built and pushed to Docker Hub
- Automated CI/CD deployment to EC2
- Zero manual deployment steps once configured

---

## 🧱 Project Structure

```
.
├─ index.html             # Login form
├─ index.js               # Express server
├─ Dockerfile             # Docker build instructions
├─ package*.json          # NPM package.json files
└─ .github/
   └─ workflows/
      └─ deploy.yml       # CI/CD workflow
```

---

## 🔐 Environment Variables

Local development uses `.env`:

```
PORT=3000
USERNAME=test
PASSWORD=pw123
SECRET_MESSAGE=CONGRATS!!! THIS IS THE SECRET MESSAGE, IT WAS WORTH IT RIGHT? RIGHT......?
```

When deployed, environment variables are set on the EC2 host (not inside the image).

---

## 🐋 Docker Usage

### Build locally

```bash
docker build -t login-service .
```

### Run locally

```bash
docker run -p 3000:3000 --env-file .env login-service
```

Then visit:

```
http://localhost:3000
```

---

## ⚙️ GitHub Actions CI/CD

On every push to the **master** branch:

1. The Docker image is built.
2. It’s pushed to Docker Hub (`markfinerty/dockerized-express:latest`).
3. GitHub Actions connects to your EC2 instance via SSH.
4. The EC2 host runs `docker compose pull && docker compose up -d`.
5. The latest container is deployed automatically.

Workflow file:

```
.github/workflows/deploy.yml
```

---

## 🖥 EC2 Server Setup

Your EC2 instance should contain this file at `~/app/docker-compose.yml`:

```
services:
  web:
    image: markfinerty/dockerized-express:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
```

## ✅ Endpoints

| Method | Route     | Description                     |
| ------ | --------- | ------------------------------- |
| GET    | `/`       | Returns "Hello World!"          |
| GET    | `/secret` | Displays login form             |
| POST   | `/secret` | Validates username and password |

---

## ☁️ Requirements

- Docker & Docker Compose installed on EC2
- EC2 security group allows inbound traffic on port **3000**
- GitHub Secrets configured:
  - DOCKER_HUB_USERNAME
  - DOCKER_HUB_TOKEN
  - EC2_HOST
  - EC2_USER
  - EC2_PORT (optional)
  - EC2_SSH_KEY
