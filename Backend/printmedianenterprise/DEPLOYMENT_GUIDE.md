# Print Median Enterprise - Docker & Digital Ocean Deployment Guide

## 📋 What You Have Now

I've created the following files for you:
1. **Dockerfile** - Instructions to build your Spring Boot application into a container
2. **docker-compose.yml** - Configuration to run your app with MySQL database
3. **.dockerignore** - Excludes unnecessary files from Docker

---

## 🔧 PART 1: Local Testing (Before Deployment)

### Step 1: Install Docker Desktop
1. Download Docker Desktop for Windows from: https://www.docker.com/products/docker-desktop
2. Install and restart your computer
3. Open Docker Desktop and wait for it to start

### Step 2: Test Locally
Open Command Prompt in your project folder and run:

```cmd
cd F:\PrintMedianEnterprise\Backend\printmedianenterprise
docker-compose up --build
```

**What this does:**
- Builds your Spring Boot application
- Creates a MySQL database
- Starts both services together
- Your app will be available at: http://localhost:8080

To stop: Press `Ctrl+C` and run `docker-compose down`

---

## 🚀 PART 2: Deploy to Digital Ocean

### Option A: Using Docker Droplet (Recommended - Easier)

#### Step 1: Create a Droplet
1. Go to Digital Ocean: https://cloud.digitalocean.com
2. Click "Create" → "Droplets"
3. Choose:
   - **Image**: Marketplace → Docker (pre-installed)
   - **Plan**: Basic ($6/month or higher)
   - **CPU**: Regular - 1GB RAM minimum (recommended 2GB)
   - **Region**: Choose closest to your users
   - **Authentication**: SSH Key (recommended) or Password
4. Click "Create Droplet"
5. Wait 1-2 minutes for creation

#### Step 2: Connect to Your Droplet
Open Command Prompt and connect via SSH:

```cmd
ssh root@YOUR_DROPLET_IP
```
(Replace YOUR_DROPLET_IP with the IP shown in Digital Ocean)

#### Step 3: Install Git (if not installed)
```bash
apt update
apt install git -y
```

#### Step 4: Upload Your Code

**Method 1: Using Git (Recommended)**
```bash
cd /opt
git clone YOUR_GITHUB_REPO_URL
cd printmedianenterprise
```

**Method 2: Manual Upload**
From your Windows computer, use SCP to upload:
```cmd
scp -r F:\PrintMedianEnterprise\Backend\printmedianenterprise root@YOUR_DROPLET_IP:/opt/
```

#### Step 5: Deploy the Application
```bash
cd /opt/printmedianenterprise
docker-compose up -d --build
```

**What this does:**
- `-d` runs in background (detached mode)
- `--build` builds your application
- Starts MySQL and your backend

#### Step 6: Configure Firewall
```bash
ufw allow 8080/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

#### Step 7: Verify Deployment
Check if services are running:
```bash
docker ps
```

View logs:
```bash
docker logs print-median-backend
```

Your API is now live at: `http://YOUR_DROPLET_IP:8080`

---

### Option B: Using Digital Ocean App Platform (Easier but Paid)

#### Step 1: Push Code to GitHub
1. Create a GitHub repository
2. Push your code:
```cmd
cd F:\PrintMedianEnterprise\Backend\printmedianenterprise
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

#### Step 2: Create App in Digital Ocean
1. Go to Digital Ocean → "App Platform" → "Create App"
2. Connect your GitHub repository
3. Select your repository and branch
4. Digital Ocean auto-detects Dockerfile
5. Add MySQL Database (Managed Database recommended)
6. Set environment variables in App Platform:
   - `SPRING_PROFILES_ACTIVE=docker`
   - `SPRING_DATASOURCE_URL=jdbc:mysql://YOUR_DB_HOST:25060/print_median_enterprise`
   - `SPRING_DATASOURCE_USERNAME=doadmin`
   - `SPRING_DATASOURCE_PASSWORD=YOUR_DB_PASSWORD`
7. Click "Deploy"

App Platform automatically handles:
- SSL certificates (HTTPS)
- Auto-scaling
- Automatic deployments when you push to GitHub

---

## 🔒 PART 3: Production Configuration

### Update application-docker.properties for Production

You need to update these settings for security:

1. **Database Password**: Change from 'root' to a strong password
2. **Server Address**: Already set to 0.0.0.0 (correct for Docker)
3. **Frontend URL**: Update to your actual domain

### Add Environment Variables (Recommended)

Modify docker-compose.yml to use environment variables:
```yaml
backend:
  environment:
    SPRING_PROFILES_ACTIVE: docker
    DB_HOST: mysql
    DB_NAME: print_median_enterprise
    DB_USER: root
    DB_PASSWORD: ${DB_PASSWORD:-root}
```

---

## 📊 PART 4: Useful Commands

### Docker Commands
```bash
# View running containers
docker ps

# View all containers
docker ps -a

# View logs
docker logs print-median-backend
docker logs -f print-median-backend  # Follow logs in real-time

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Remove everything (including database!)
docker-compose down -v
```

### Update Your Application
```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

---

## 🌐 PART 5: Add Domain Name (Optional)

### Step 1: Point Domain to Droplet
1. In your domain registrar (GoDaddy, Namecheap, etc.)
2. Add an A record:
   - Name: @ (or subdomain like 'api')
   - Value: YOUR_DROPLET_IP
   - TTL: 3600

### Step 2: Install Nginx as Reverse Proxy
```bash
apt install nginx -y
```

Create Nginx configuration:
```bash
nano /etc/nginx/sites-available/printmedian
```

Add this content:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and restart:
```bash
ln -s /etc/nginx/sites-available/printmedian /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 3: Add SSL Certificate (HTTPS)
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Your site will now have HTTPS!

---

## 🔍 PART 6: Monitoring & Troubleshooting

### Check Application Status
```bash
# Check if services are running
docker ps

# Check application logs
docker logs print-median-backend --tail 100

# Check MySQL logs
docker logs print-median-mysql --tail 100

# Check system resources
docker stats
```

### Common Issues

**Issue 1: Port 8080 already in use**
```bash
# Find what's using the port
netstat -tulpn | grep 8080
# Kill the process
kill -9 PID_NUMBER
```

**Issue 2: Database connection failed**
- Wait 20-30 seconds for MySQL to fully start
- Check MySQL is running: `docker ps`
- Check MySQL logs: `docker logs print-median-mysql`

**Issue 3: Application won't start**
- Check logs: `docker logs print-median-backend`
- Ensure application-docker.properties exists
- Verify database credentials

**Issue 4: Out of memory**
- Upgrade your droplet to at least 2GB RAM
- Or add swap space:
```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
```

---

## 💰 Cost Estimate

**Digital Ocean Pricing:**
- Basic Droplet (2GB RAM): $12/month
- Managed MySQL Database (1GB): $15/month
- App Platform: ~$12-25/month
- Total: ~$12-40/month depending on option

**Recommendation for Beginners:**
Start with Docker Droplet ($12/month) - It's cheaper and you have full control.

---

## 🎯 Quick Start Summary

**For Local Testing:**
```cmd
docker-compose up --build
```

**For Production (Digital Ocean):**
```bash
# 1. SSH into droplet
ssh root@YOUR_DROPLET_IP

# 2. Clone/Upload code
git clone YOUR_REPO_URL
cd printmedianenterprise

# 3. Deploy
docker-compose up -d --build

# 4. Check logs
docker logs -f print-median-backend
```

---

## 📞 Next Steps

1. ✅ Test locally first with `docker-compose up --build`
2. ✅ Create Digital Ocean account
3. ✅ Create a Docker droplet
4. ✅ Upload your code
5. ✅ Deploy with docker-compose
6. ✅ Configure your frontend to use the new API URL
7. ✅ (Optional) Add domain name and SSL

---

## 📚 Additional Resources

- Docker Documentation: https://docs.docker.com
- Digital Ocean Tutorials: https://www.digitalocean.com/community/tutorials
- Spring Boot Docker Guide: https://spring.io/guides/gs/spring-boot-docker

---

**Need Help?**
- Check logs first: `docker logs print-median-backend`
- Verify services: `docker ps`
- Restart: `docker-compose restart`

