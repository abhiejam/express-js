## Prisma quickstart (MySQL)

This is a concise, practical guide to get Prisma running, model your data, run migrations, and do basic CRUD in Node/Express.

### 1) Install CLIs and init the project
`npm i -D prisma`

Initialize Prisma with a MySQL datasource:
`npx prisma init --datasource-provider mysql`

- This creates `prisma/schema.prisma` and adds `DATABASE_URL` to `.env`.
- To target Postgres, change the provider to `postgres` during init or later in `schema.prisma`.

### 2) Configure DATABASE_URL
Example for local MySQL in `.env`:
```bash
DATABASE_URL="mysql://root:password@localhost:3306/mydb"
```

### 3) Define your data model
Edit `prisma/schema.prisma`:
```bash
model Post {
  id    Int    @id @default(autoincrement())
  title String

  @@map("posts")
}
```

- `@@map("posts")` maps the Prisma model `Post` to the DB table `posts`.

### 4) Create and apply a migration (dev)
Generate a SQL migration file based on the model and apply it to your dev DB:
`npx prisma migrate dev --name init`

What this does:
- Creates a new migration file in `prisma/migrations/...`.
- Applies it to the DB.
- Regenerates the Prisma Client.

Tip: If you only want to sync schema to a non-production DB without creating a migration, you can use `npx prisma db push` (good for prototyping). For team/dev workflows, prefer `migrate dev`.

### 5) Install and generate Prisma Client
`npm i @prisma/client`

Regenerate client (run this after schema changes):
`npx prisma generate`

### 6) Create a Prisma Client instance
Create a single shared client and reuse it in your app (avoid multiple instances):
```bash
// prisma-client.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;
```

Use it in controllers/services:
```bash
// controllers/postController.js
const prisma = require('../prisma-client');

// Example: find by id
async function getPostById(req, res, next) {
  try {
    const id = Number(req.params.id); // route params are strings
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}
```

### 7) CRUD examples for `Post`

- Create:
```bash
const post = await prisma.post.create({
  data: { title: 'Hello Prisma' },
});
```

- Read (all):
```bash
const posts = await prisma.post.findMany();
```

- Read (by id):
```bash
const post = await prisma.post.findUnique({ where: { id: Number(id) } });
// or throw if not found
const post2 = await prisma.post.findUniqueOrThrow({ where: { id: Number(id) } });
```

- Update:
```bash
const updated = await prisma.post.update({
  where: { id: Number(id) },
  data: { title: 'Updated title' },
});
```

- Delete:
```bash
await prisma.post.delete({ where: { id: Number(id) } });
```

### 8) Useful commands

- Prisma Studio (visual DB browser):
`npx prisma studio`

- Format schema file:
`npx prisma format`

- Reset dev database (drops and re-applies migrations):
`npx prisma migrate reset`

### 9) Common tips and gotchas

- Route params are strings; cast to `Number` for numeric ids.
- Use `findUniqueOrThrow` when you prefer exceptions over `null` checks.
- Regenerate the client after changing `schema.prisma`: `npx prisma generate`.
- Create only one `PrismaClient` instance for the whole app.
- For production, use migrations (`migrate deploy`), not `db push`:
  - Deploy on CI/servers: `npx prisma migrate deploy`.