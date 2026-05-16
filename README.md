# MediaHouse Backend

This repository contains the Strapi backend for the MediaHouse application. It provides content management for articles, authors, categories, tags, and newsletter subscribers.

## Project Overview

The backend manages:

- Article content and publishing workflow
- Author profiles and associated metadata
- Category management for article grouping
- Newsletter subscriber collection storage
- Strapi admin user interface for editorial control

## Tech Stack

- Strapi CMS
- PostgreSQL database
- Node.js

## Setup

1. Install dependencies:

```bash
cd mediahouse-backend
npm install
```

2. Create or update the backend environment file:

```bash
cp .env.example .env
```

3. Start the Strapi server:

```bash
npm run develop
```

4. Open the Strapi admin panel:

```text
http://localhost:1337/admin
```

## Available Scripts

- `npm run develop` - Run Strapi in development mode with live reload
- `npm run start` - Start Strapi without the development watch mode
- `npm run build` - Build the Strapi admin panel for production

## Directory Structure

- `src/api/` - Strapi content types, controllers, services, and routes
- `config/` - Strapi configuration files
- `public/` - Static files served by Strapi
- `.tmp/` - Strapi temporary runtime files (ignored from source control)

## Environment Configuration

### Local Development (PostgreSQL)

```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_password
DATABASE_SSL=false
```

### Production (Render.com)

Render provides `DATABASE_URL` automatically. Set these in your Render environment variables:

```bash
DATABASE_CLIENT=postgres
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

(The `DATABASE_URL` is automatically set by Render when you add PostgreSQL database)

Use `mediahouse-backend/.env` to store local configuration and secret values. Do not commit `.env` to version control.

## Deployment to Render.com

### Step 1: Prepare for Deployment

1. Ensure your code is pushed to GitHub
2. Update `.env.example` with necessary variables (already done)

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click "New" → "Web Service"
3. Select your `mediahouse-backend` repository
4. Configure the service:
   - **Name**: `mediahouse-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free` (or paid for production)

### Step 3: Add PostgreSQL Database

1. In the Render dashboard, click "New" → "PostgreSQL"
2. Configure:
   - **Name**: `mediahouse-db`
   - **Database**: `strapi`
   - **User**: `strapi`
3. Copy the `Internal Database URL` after creation

### Step 4: Connect Database to Web Service

1. Go back to your web service
2. Click "Environment"
3. Add environment variables:

   - `DATABASE_CLIENT=postgres`
   - `DATABASE_URL=<paste the database URL from step 3>`
   - `DATABASE_SSL=true`
   - `DATABASE_SSL_REJECT_UNAUTHORIZED=false`

4. For security, also add:
   - `APP_KEYS` (generate a secure value or copy from local `.env`)
   - `API_TOKEN_SALT` (generate a secure value)
   - `ADMIN_JWT_SECRET` (generate a secure value)
   - `TRANSFER_TOKEN_SALT` (generate a secure value)
   - `JWT_SECRET` (generate a secure value)
   - `ENCRYPTION_KEY` (generate a secure value)

### Step 5: Deploy

- Render will automatically deploy when you push to GitHub
- Monitor the deployment in the Render dashboard

### Step 6: Access Your Backend

- Your Strapi admin panel will be at: `https://your-service-name.onrender.com/admin`
- Your API will be at: `https://your-service-name.onrender.com/api`

## Notes for Review

- This repository is intended to operate as an independent backend service.
- The frontend should connect to this backend via `http://localhost:1337`.
- The subscriber collection type is stored in `src/api/subscriber/content-types/subscriber/schema.json`.

- [ ] Backend starts successfully
- [ ] Strapi admin interface is accessible
- [ ] Content types load in the admin panel
- [ ] Subscriber data can be created via frontend or Strapi API
