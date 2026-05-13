# Docker Network Error - Troubleshooting Guide

## Error: "no such host" or "failed to resolve"

This means Docker can't connect to the Cloudflare CDN to download images.

## 🚨 YOUR SPECIFIC ISSUE:
You can download small images (hello-world) but fail on larger images (eclipse-temurin).
This is a DNS resolution issue with Cloudflare's storage domain.

## ✅ WORKING SOLUTIONS:

### Solution 1: Use Alternative Base Images (EASIEST - Try This First!)
Use Docker images from different registries that don't use Cloudflare CDN.

**Action:** I've created updated Dockerfile files for you - use Dockerfile.alternative

### Solution 2: Configure Docker to Use Google DNS (RECOMMENDED)
1. Open Docker Desktop
2. Click Settings (gear icon) 
3. Go to **Docker Engine** (not Resources → Network)
4. Add this DNS configuration to the JSON:
```json
{
  "dns": ["8.8.8.8", "8.8.4.4", "1.1.1.1"]
}
```
5. Click "Apply & Restart"
6. Wait for Docker to restart completely
7. Try again: `docker pull eclipse-temurin:17-jre-jammy`

### Solution 3: Add Cloudflare CDN to Windows hosts file
1. Open Notepad as Administrator
2. Open file: `C:\Windows\System32\drivers\etc\hosts`
3. Add this line at the end:
```
104.21.89.211 docker-images-prod.6aa30f8b08e16409b46e0173d6de2f56.r2.cloudflarestorage.com
```
4. Save and close
5. Restart Docker Desktop
6. Try again

### Solution 4: Use Mobile Hotspot
Your network/router might be blocking Cloudflare CDN:
1. Enable mobile hotspot on your phone
2. Connect your PC to the hotspot
3. Try pulling the image again
4. Once downloaded, you can switch back to WiFi

### Solution 5: Use Local Build (NO INTERNET NEEDED)
Build your app locally first, then containerize:
1. Build locally: `mvnw.cmd clean package -DskipTests`
2. Use Dockerfile.local which doesn't need to download Maven image

### Solution 6: Use Docker Hub Mirror
Configure Docker to use a mirror registry:
1. Docker Desktop → Settings → Docker Engine
2. Add mirror configuration:
```json
{
  "registry-mirrors": ["https://mirror.gcr.io"]
}
```

---

## 🎯 RECOMMENDED ACTION FOR YOU:

Since you can't download eclipse-temurin, use the alternative Dockerfile I created.
It uses images from a different source that should work better.

**Steps:**
1. Use the new Dockerfile.alternative file
2. Or build locally with Dockerfile.local (guaranteed to work)

---

## Test Docker Connection

Run this to test if Docker can access the internet:
```bash
docker pull hello-world
```

If this works, then try:
```bash
docker pull eclipse-temurin:17-jre-jammy
```

If the second command fails with Cloudflare errors, use Solution 1, 2, or 5 above.
