# Mini Lead Tracker CRM

This is a small service (mini-CRM) for managing leads with comments, search, filtering, and pagination.

## Tech Stack
- **Backend:** NestJS, Prisma ORM, PostgreSQL, Swagger
- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS
- **Other:** Docker, Docker Compose

---

## How to Run Locally

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v20+)
- Docker and Docker Compose

### 2. Run via Docker (Recommended)
You can start the entire project (database, backend, and frontend) with a single command. The environment is pre-configured to handle database setup automatically:

```bash
docker compose up --build
```

Once the build is complete:
- **Frontend:** [http://localhost:3001](http://localhost:3001) (Next.js)
- **Backend:** [http://localhost:3000](http://localhost:3000) (NestJS + Swagger)
- **Swagger Docs:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### 3. Run without Docker (For Development)

#### Backend:
1. Navigate to the `backend` folder: `cd backend`
2. Copy `.env.example` to `.env` and configure `DATABASE_URL`.
3. Install dependencies: `npm install`
4. Generate Prisma client: `npx prisma generate`
5. Run migrations: `npx prisma migrate dev`
6. Start the server: `npm run start:dev`

#### Frontend:
1. Navigate to the `frontend` folder: `cd ../frontend`
2. Copy `.env.example` to `.env`.
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

---

## Environment Variables

### Backend (`backend/.env`)
- `DATABASE_URL`: PostgreSQL connection URL.
- `PORT`: Port the server will run on (default is 3000).

### Frontend (`frontend/.env`)
- `NEXT_PUBLIC_API_URL`: URL for API requests (default is `http://localhost:3000/api`).

---

## How to Test the API

Main endpoints:
1. **List Leads:** `GET /api/leads?q=John&status=NEW&page=1&limit=10&sort=createdAt&order=desc`
2. **Create Lead:** `POST /api/leads` (Body: `{ "name": "John Doe", "email": "john@example.com" }`)
3. **Add Comment:** `POST /api/leads/:id/comments` (Body: `{ "text": "Some note" }`)
4. **List Comments:** `GET /api/leads/:id/comments`

Full documentation is available at: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## Build and Production Deployment

To run in production mode via Docker:
```bash
docker compose -f docker-compose.yml up --build -d
```

For manual build:
- **Backend:** `npm run build` -> `npm run start:prod`
- **Frontend:** `npm run build` -> `npm run start`
