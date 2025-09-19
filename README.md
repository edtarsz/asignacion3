# Containerized Setup

Angular frontend, Node.js API, and MySQL run together through `docker compose`. No local Node or Angular tooling is required unless you want to develop outside containers.

## Prerequisites
- Docker Engine 24+ with Compose Plugin 2.20+ (`docker version`, `docker compose version`).

## 1. Configure Environment
1. Copy the template: `cp .env.example .env`.
2. Tweak only if needed:
   - `BACKEND_PORT`, `FRONTEND_PORT`, `DB_EXPOSE_PORT` map container ports to localhost.
   - `DB_USER`, `DB_PASSWORD`, `DB_NAME` seed MySQL on first run.
   - `DATABASE_URL` must stay aligned with those values for Sequelize.

## 2. Build and Launch
```bash
docker compose up --build -d
```
- `backend` builds from `backend/Dockerfile.dev` and starts the Node.js server with `npm run dev`.
- `frontend` builds the Angular app and serves it via Nginx.
- `mysql` (8.0) keeps its data in the `mysql_data` volume and exposes a health check for the API to wait on.

When the stack is healthy:
- API → `http://localhost:${BACKEND_PORT}` (default 3000)
- UI → `http://localhost:${FRONTEND_PORT}` (default 4200)
- MySQL → `localhost:${DB_EXPOSE_PORT}` with the credentials from `.env`

## 3. Database Setup

After the first launch, the MySQL database will be empty. You need to create the tables and populate them using the following commands:

1.  **Create the database tables:**
    ```bash
    docker compose exec backend npm run sync
    ```

2.  **Seed the database with sample data (optional):**
    ```bash
    docker compose exec backend npm run seed
    ```

## 4. Observe and Maintain
- Combined logs: `docker compose logs -f`
- Service-specific: `docker compose logs -f backend`
- Status: `docker compose ps`

## 5. Lifecycle Commands
- Stop containers (keep data): `docker compose down`
- Remove containers + volume: `docker compose down -v` *(erases database)*
- Force rebuilds after Dockerfile changes: `docker compose up --build -d`

## 6. Optional Local Development
1. Bring up only MySQL: `docker compose up mysql -d`.
2. Run `npm install` once in `backend/` and `frontend/`.
3. Ensure `.env` ports do not collide with locally running apps.
4. Start services locally: `npm run dev` (backend) and `npm start` (frontend).

Keep only one instance (containers or local processes) on the same ports to avoid conflicts. Once `.env` is in place, `docker compose up --build -d` remains the quickest path to a full stack.