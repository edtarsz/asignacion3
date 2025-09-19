# Containerized Setup

Angular frontend, Node.js API, and PostgreSQL run together through `docker compose`. No local Node or Angular tooling is required unless you want to develop outside containers.

## Prerequisites
- Docker Engine 24+ with Compose Plugin 2.20+ (`docker version`, `docker compose version`).

## 1. Configure Environment
1. Copy the template: `cp .env.example .env`.
2. Tweak only if needed:
   - `BACKEND_PORT`, `FRONTEND_PORT`, `DB_EXPOSE_PORT` map container ports to localhost.
   - `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SCHEMA` seed PostgreSQL on first run.
   - `DATABASE_URL` must stay aligned with those values for Prisma.

## 2. Build and Launch
```bash
docker compose up --build -d
```
- `backend` builds from `backend/Dockerfile.dev`, generates the Prisma client, runs pending migrations, then starts with `npm run dev`.
- `frontend` builds the Angular app for production and serves it via Nginx.
- `postgres` (17.6) keeps its data in the `postgres_data` volume and exposes health status for the API to wait on.

When the stack is healthy:
- API → `http://localhost:${BACKEND_PORT}` (default 3000)
- UI → `http://localhost:${FRONTEND_PORT}` (default 4200)
- PostgreSQL → `localhost:${DB_EXPOSE_PORT}` with the credentials from `.env`

## 3. Observe and Maintain
- Combined logs: `docker compose logs -f`
- Service-specific: `docker compose logs -f backend`
- Status: `docker compose ps`
- Prisma tasks from the running container:
  - `docker compose exec backend npx prisma migrate dev`
  - `docker compose exec backend npm run prisma:generate`
  - `docker compose exec backend npm run prisma:studio`

## 4. Lifecycle Commands
- Stop containers (keep data): `docker compose down`
- Remove containers + volume: `docker compose down -v` *(erases database)*
- Force rebuilds after Dockerfile changes: `docker compose up --build -d`

## 5. Optional Local Development
1. Bring up only Postgres: `docker compose up postgres -d`.
2. Run `npm install` once in `backend/` and `frontend/`.
3. Ensure `.env` ports do not collide with locally running apps.
4. Start services locally: `npm run dev` (backend) and `npm start` (frontend).

Keep only one instance (containers or local processes) on the same ports to avoid conflicts. Once `.env` is in place, `docker compose up --build -d` remains the quickest path to a full stack.
