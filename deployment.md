# 🚀 Trandora — Deployment Setup Guide

## Quick Start: What You Need

| Service | MVP Option (Cheap) | Production Option |
|---------|-------------------|-------------------|
| **Server** | AWS EC2 t3.small ($15/mo) | ECS Fargate (auto-scaling) |
| **Database** | MongoDB Atlas M0 (FREE) | MongoDB Atlas M10 ($57/mo) |
| **Redis** | Self-hosted on EC2 | ElastiCache ($13/mo) |
| **Domain** | trandora.ai (when purchased) | + CloudFlare CDN |
| **SSL** | Let's Encrypt (FREE) | CloudFlare (FREE) |
| **Docker Registry** | Docker Hub (FREE) | ECR ($0.10/GB) |
| **CI/CD** | GitHub Actions (FREE for public) | Same |

**MVP monthly cost: ~$15-30/month** (EC2 + Atlas free tier)

---

## Step 1: GitHub Repository Secrets

Go to your repo → Settings → Secrets → Actions and add:

```
# Docker Hub (create account at hub.docker.com)
DOCKER_USERNAME        → your Docker Hub username
DOCKER_PASSWORD        → your Docker Hub access token

# Staging Server
STAGING_HOST           → EC2 public IP or domain
STAGING_USER           → ubuntu (or ec2-user)
STAGING_SSH_KEY        → contents of your SSH private key

# Production Server (can be same as staging for MVP)
PROD_HOST              → EC2 public IP or domain
PROD_USER              → ubuntu
PROD_SSH_KEY           → SSH private key
```

---

## Step 2: Server Setup (EC2)

### Launch EC2 Instance
1. Go to AWS Console → EC2 → Launch Instance
2. **AMI:** Ubuntu 24.04 LTS
3. **Type:** t3.small (2 vCPU, 2 GB RAM — enough for MVP)
4. **Storage:** 30 GB gp3
5. **Security Group:** Open ports 80, 443, 22 (SSH)
6. **Key Pair:** Create or use existing

### Install Docker on Server
```bash
# SSH into your server
ssh -i your-key.pem ubuntu@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Log out and back in for group changes
exit
ssh -i your-key.pem ubuntu@your-server-ip

# Verify
docker --version
docker-compose --version
```

### Setup Application Directory
```bash
# Create app directory
sudo mkdir -p /opt/trandora/nginx/ssl /opt/trandora/nginx/logs
sudo chown -R $USER:$USER /opt/trandora
cd /opt/trandora

# Copy production compose and nginx config from repo
# (These get auto-updated on deployment, but need initial setup)

# Create .env.production
cat > .env.production << 'EOF'
NODE_ENV=production
MONGODB_URI=mongodb+srv://trandora:YOUR_PASSWORD@cluster.mongodb.net/trandora_prod
REDIS_URL=redis://redis:6379
JWT_SECRET=GENERATE_A_STRONG_SECRET_HERE
NEXTAUTH_SECRET=GENERATE_ANOTHER_SECRET
NEXTAUTH_URL=https://trandora.ai
API_URL=https://trandora.ai/api
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
ANTHROPIC_API_KEY=your_key
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=ap-south-1
AWS_S3_BUCKET=trandora-media
EOF

# Generate secrets
echo "JWT_SECRET: $(openssl rand -base64 32)"
echo "NEXTAUTH_SECRET: $(openssl rand -base64 32)"
```

### Setup SSL with Let's Encrypt (after domain is pointed)
```bash
# Install certbot
sudo apt install certbot
sudo certbot certonly --standalone -d trandora.ai -d www.trandora.ai

# Copy certs
sudo cp /etc/letsencrypt/live/trandora.ai/fullchain.pem /opt/trandora/nginx/ssl/
sudo cp /etc/letsencrypt/live/trandora.ai/privkey.pem /opt/trandora/nginx/ssl/

# Auto-renewal cron
echo "0 0 1 * * certbot renew --quiet && cp /etc/letsencrypt/live/trandora.ai/*.pem /opt/trandora/nginx/ssl/" | sudo crontab -
```

---

## Step 3: MongoDB Atlas Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free account
2. Create cluster → **M0 Free** (512 MB, enough for MVP)
3. Region: **Mumbai (ap-south-1)** for lowest latency
4. Database user: `trandora` with a strong password
5. Network access: Add your EC2 server IP (or 0.0.0.0/0 for dev)
6. Get connection string → Put in `.env.production`

---

## Step 4: First Deployment

After all the above is configured:

```bash
# On your local machine
git push origin develop    # Triggers staging deployment
git push origin main       # Triggers production deployment
```

That's it. GitHub Actions handles:
1. Install dependencies
2. Lint + type check + test
3. Build Docker images
4. Push to Docker Hub
5. SSH into server
6. Pull new images
7. Restart containers
8. Health check

---

## The Flow

```
Developer pushes code
        │
        ▼
GitHub Actions triggered
        │
        ├── Lint ✅
        ├── Type check ✅
        ├── Tests ✅
        │
        ▼
Docker images built & pushed
        │
        ▼
SSH into EC2 server
        │
        ├── Pull new images
        ├── Restart containers
        ├── Health check
        │
        ▼
🏹 Live at trandora.ai!
```

---

## Monitoring (MVP)

```bash
# Check containers
docker ps

# View logs
docker logs trandora-api --tail 100 -f
docker logs trandora-web --tail 100 -f

# Check disk/memory
df -h
free -m
docker stats
```

For production monitoring, add Sentry (error tracking) and UptimeRobot (uptime monitoring) — both have free tiers.

---

*🏹 Source India. Scale Global.*
