# TodoApp

A modern Todo Application built with Next.js, TypeScript, Prisma, SQLite, Tailwind CSS, and DaisyUI.

## Features

- Create tasks
- Edit tasks
- Archive tasks
- Categorize tasks by topic
- Set due dates
- Track task status:
  - Todo
  - In Progress
  - Complete
- View active and archived tasks
- Sort tasks by:
  - Status
  - Due Date
  - Topic
- Responsive UI with DaisyUI and Tailwind CSS

---

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- SQLite
- Tailwind CSS 4
- DaisyUI 5

---

## Prerequisites

Install the following before running the project:

### Node.js

Recommended version:

```bash
Node.js v22.23.2
```

Check your version:

```bash
node -v
```

If you do not have Node.js installed, download it from:

https://nodejs.org

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd TodoApp
```

Install dependencies:

```bash
npm install
```

---

## Prisma Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Create and synchronize the SQLite database:

```bash
npx prisma db push
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Project Structure

```text
TodoApp/
│
├── app/
│   ├── components/
│   ├── page.tsx
│   └── layout.tsx
│
├── prisma/
│   ├── schema.prisma
│   └── dev.db
│
├── src/
│   └── lib/
│       ├── prisma.ts
│       └── todoActions.ts
│
├── public/
│
├── .env
├── package.json
└── README.md
```

---

## Database Schema

### Task Status

```prisma
enum TaskStatus {
  Todo
  InProgress
  Complete
}
```

### Todo Model

```prisma
model Todo {
  id          Int        @id @default(autoincrement())
  title       String
  description String?
  topic       String?
  dueDate     DateTime?
  status      TaskStatus @default(Todo)
  archived    Boolean    @default(false)
  createdAt   DateTime   @default(now())
}
```

---

## Available Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Build

```bash
npm run start
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Sync Database

```bash
npx prisma db push
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## Team Setup

After pulling the latest changes:

```bash
git pull origin main
npm install
npx prisma generate
npx prisma db push
npm run dev
```

---

## Author
Wilson Legadima
Software Design Project

University of the Witwatersrand

Developed using Next.js, Prisma, and SQLite.
