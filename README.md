## Running with Docker

This project provides Docker support for both the API server and the web frontend, using Bun (version 1.2+) as the runtime. Docker Compose is configured to orchestrate both services for local development or deployment.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **SQLite/Turso** - Database engine
- **Authentication** - Email & password authentication with Better Auth

### Requirements

- **Docker** and **Docker Compose** installed on your system

### Environment Variables

- Each service loads its environment variables from its respective `.env` file:
  - `apps/server/.env` for the API server
  - `apps/web/.env` for the web frontend
- Ensure these files are present and configured before building the containers.

### Build and Run

To build and start both the API server and web frontend, run:

```bash
docker compose up --build
```

This will:

- Build the `api` (API) and `web` (frontend) images using the provided Dockerfiles
- Start both services and attach them to a shared Docker network

### Service Details

- **API Server (`ts-server`)**

  - Runs on Bun 1.2+ (Alpine)
  - Exposes port **3000** (Hono, tRPC API)
  - Uses SQLite database file included in the image
  - Loads environment from `apps/server/.env`

- **Web Frontend (`ts-web`)**
  - Runs on Bun 1.2+ (Alpine)
  - Exposes port **3001** (TanStack Start SSR frontend)
  - Loads environment from `apps/web/.env`
  - Depends on the API server for backend communication

## Project Structure

```
razor/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Start)
│   └── server/      # Backend API (Hono, tRPC)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI
- `cd apps/server && bun db:local`: Start the local SQLite database

### Notes

- The API server and web frontend are accessible at:
  - [http://localhost:3000](http://localhost:3000) (API)
  - [http://localhost:3001](http://localhost:3001) (Web)
- If you make changes to dependencies or source code, re-run `docker compose up --build` to rebuild the images.
- No additional database setup is required; the SQLite file is managed within the server container.
