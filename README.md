# 🐍 Snake Game – DevSecOps Demo Project

A modern Snake game built using TypeScript and Vite, containerized with Docker, deployed using Kubernetes, and integrated with CI/CD via GitHub Actions. Inspired by the Bolt app, this project demonstrates a DevSecOps-ready pipeline with testing, security, and automation.

---

## 📁 Project Structure

```bash
├── __tests__/                   # Unit tests
│   └── GameLogic.test.ts       # Test file for game logic
├── .husky/                     # Git hooks for pre-commit
├── dist/                       # Build output (production)
├── github\workflows/          # GitHub Actions workflows
│   └── cicd.yml                # CI/CD workflow
├── kubernetes/                 # Kubernetes manifests
│   ├── deployment.yml
│   ├── services.yml
│   └── ingress.yml
├── src/                        # Frontend game source code
├── Dockerfile                  # Docker build config
├── .eslintrc.js                # Linting config
├── .prettierrc                 # Prettier formatting rules
├── tailwind.config.js          # Tailwind CSS config
├── vite.config.ts              # Vite build tool config
├── tsconfig*.json              # TypeScript configs
├── README.md                   # Project documentation
```
## 🧪 Running Locally
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/snake-game-ts-docker.git
cd snake-game-ts-docker
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the Game in Dev Mode
bash
Copy
Edit
npm run dev
4. Run Unit Tests
bash
Copy
Edit
npm test
```
```

### 🐳 Docker Usage
🔨 Build Docker Image
```
docker build -t snake-game .
```
### 🚀 Run Docker Container
```
docker run -p 3000:3000 snake-game
```
### 🌐 Access the Game:
```
http://localhost:3000
```

### ☸️ Kubernetes Deployment
```
Ensure your cluster is running (via Minikube, Kind, or Cloud)
```
### Apply Manifests
```
kubectl apply -f kubernetes/deployment.yml
kubectl apply -f kubernetes/services.yml
kubectl apply -f kubernetes/ingress.yml
```
### Monitor Resources
```
kubectl get pods
kubectl get svc
kubectl get ingress
```
🔁 GitHub Actions CI/CD
GitHub Actions automates:

✅ Linting

✅ Unit testing

✅ Docker image build & push

✅ Kubernetes deployment (optionally via ArgoCD)

Located at: .github/workflows/cicd.yml
```
