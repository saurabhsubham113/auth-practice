# Auth Practice

A small authentication service built with Express, TypeScript, Prisma, MySQL, Zod, and bcrypt.

## Features

- User registration with password hashing
- User login with bcrypt password verification
- Request validation with Zod
- Request logging and basic health check
- Prisma-backed MySQL persistence

## Project Structure

- `src/index.ts` starts the server and registers middleware
- `src/routes/auth.ts` defines auth routes
- `src/controller/` contains request handlers
- `src/services/` contains auth and database logic
- `src/middleware/` contains validation and request logger middleware
- `prisma/schema.prisma` defines the database schema

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
DATABASE_URL="mysql://subham:subham%40%24%24ubh%40M@127.0.0.1:3306/auth_practice"
PORT=3000
```

3. Start MySQL:

```bash
docker compose up -d
```

4. Apply Prisma migrations:

```bash
npx prisma migrate dev
```

5. Run the app:

```bash
npm run start
```

## API Endpoints

Base path: `/api/auth`

- `POST /register`
- `POST /login`
- `GET /test`
- `GET /health`

Example register request:

```json
{
  "firstName": "Subham",
  "lastName": "Saurabh",
  "email": "subham@example.com",
  "phoneNumber": "+919999999999",
  "password": "password123"
}
```

## Validation Rules

- `firstName` and `lastName` are required
- `email` must be valid
- `phoneNumber` must match `+?digits/spaces/hyphens`
- `password` must be at least 8 characters

## Development

- `npm run start` runs the app in watch mode with `tsx`
- `npm run build` compiles TypeScript to `dist/`

There is no automated test setup yet, so use `npm run build` as the minimum verification step before pushing changes.
