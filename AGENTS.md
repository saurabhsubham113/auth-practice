# Repository Guidelines

## Project Structure & Module Organization
This repository is a TypeScript Express auth service. Application code lives in `src/`:

- `src/index.ts` boots the server and registers middleware/routes.
- `src/routes/` defines HTTP endpoints.
- `src/controller/` handles request/response flow.
- `src/services/` contains auth and business logic.
- `src/middleware/` stores validation, auth, and request-logging middleware.
- `src/utils/` contains shared helpers such as logging and API response formatting.
- `prisma/schema.prisma` defines the MySQL schema; migrations live in `prisma/migrations/`.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run start` runs the app with `tsx watch src/index.ts` for local development.
- `npm run build` compiles TypeScript into `dist/`.
- `docker compose up -d` starts the local MySQL service defined in `docker-compose.yml`.
- `npx prisma migrate dev` applies schema changes to the local database.

Run commands from the repository root.

## Coding Style & Naming Conventions
Use strict TypeScript and keep imports explicit. Follow the existing 2-space indentation and double-quote style used across `src/`. Prefer:

- `camelCase` for variables and functions
- `PascalCase` for controllers, types, and classes
- `kebab-case` for filenames such as `request-logger.middleware.ts`

There is no ESLint or Prettier config yet, so match nearby code and keep changes small and consistent.

## Testing Guidelines
There is no test framework configured yet. Until one is added, treat `npm run build` as the minimum verification step for every change. When adding tests, place them close to the feature or under a dedicated `src/__tests__/` tree, and use names ending in `.test.ts`.

## Commit & Pull Request Guidelines
This branch has no commit history yet, so use clear imperative commit messages, for example: `feat: add request logging middleware` or `fix: handle prisma startup errors`. Keep each commit focused.

PRs should include a short summary, affected routes/modules, setup or migration notes, and sample requests/responses when API behavior changes.

## Security & Configuration Tips
Load configuration from environment variables with `dotenv`. Do not commit real secrets. Treat the credentials in `docker-compose.yml` as local-only defaults and replace them for shared or production environments.
