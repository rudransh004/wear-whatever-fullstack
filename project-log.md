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
