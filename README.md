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
- SQLite database for local development
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

- `DATABASE_CLIENT=sqlite`
- `DATABASE_FILENAME=.tmp/data.db`

Use `mediahouse-backend/.env` to store local configuration and secret values. Do not commit `.env` to version control.

## Notes for Review

- This repository is intended to operate as an independent backend service.
- The frontend should connect to this backend via `http://localhost:1337`.
- The subscriber collection type is stored in `src/api/subscriber/content-types/subscriber/schema.json`.

- [ ] Backend starts successfully
- [ ] Strapi admin interface is accessible
- [ ] Content types load in the admin panel
- [ ] Subscriber data can be created via frontend or Strapi API
