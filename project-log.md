# Wear-Whatever — Fullstack Project Log

## Phase 1: Project Setup & Infrastructure
1. Initialized a Next.js application using `create-next-app` (App Router).
2. Added a static navigation bar as a reusable component to validate component structure early.
3. Created a Supabase Postgres database for managed hosting and auth-ready backend.
4. Connected the application to Supabase using the session-layer connection string.
5. Integrated Prisma (v7) as the ORM for schema-driven development and type safety.

## Phase 2: Data Modeling
Defined the initial schema focused on core e-commerce entities.

### Product
- Supports multiple images via `String[]` (kept denormalized for early-stage simplicity).
- `isAiEnabled` flag added to distinguish AI-generated apparel from standard products.

### User
- Minimal user model for now (email + name).
- Authentication and profile expansion deferred intentionally.

### Order
- Linked to User via foreign key relation.
- Status defaults to `PENDING` to support future order lifecycle states.

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  images      String[]
  category    String
  isAiEnabled Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model User {
  id     String   @id @default(cuid())
  email  String   @unique
  name   String?
  orders Order[]
}

model Order {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  total     Float
  status    String   @default("PENDING")
  createdAt DateTime @default(now())
}
```

## Phase 3: Database Integration & API Layer

Established a stable and scalable database integration between the Next.js application and Supabase, and introduced the first backend API surface.

### 1. Prisma 7 Runtime Configuration
- Configured Prisma using `prisma.config.ts` at the project root instead of `package.json`.
- This enables typed, explicit configuration and aligns with Prisma 7’s recommended setup for long-term maintainability.
- Adopted Prisma 7’s new driver adapter approach by installing `@prisma/adapter-pg` and `pg`, preparing the project for serverless-friendly execution without the legacy engine dependency.

### 2. Database Client Lifecycle Management
- Implemented a centralized database utility at `src/lib/db.ts`.
- Used a Singleton pattern to ensure a single `PrismaClient` instance during development, preventing excessive database connections caused by Next.js hot reloading.
- This solution primarily addresses development-time issues; production connection limits will rely on Supabase’s built-in pooling.

### 3. Database Seeding Strategy
- Created a seed script at `prisma/seed.ts` to populate the database with initial T-shirt product data.
- The script resets product data using `deleteMany()` before insertion to guarantee a deterministic, clean database state during early development.
- This approach is intentionally destructive and limited to non-production environments.

### 4. Initial REST API Development
- Implemented the first backend route handler at `app/api/products/route.ts`.
- Added a `GET` endpoint to fetch all products from the database and return them as JSON for frontend consumption.
- Wrapped database access in `try/catch` blocks to handle connection or query failures gracefully and return appropriate server error responses.
- A REST-based API was chosen at this stage to keep data access decoupled from UI logic and to allow independent testing and future extensibility.
