### BACKEND

- pnpm install
- pnpm run approve-builds
- npx prisma@6.0.1 migrate reset
- npx prisma@6.0.1 migrate dev
- pnpm run seed
- pnpm run start:dev

### FRONTEND

- pnpm install
- pnpm run dev

#### How to Add School Term?

- In the backend/prisma/seed.ts
- Search for 'ADD SCHOOL TERM' and read the instruction
