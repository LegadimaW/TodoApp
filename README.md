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
git clone https://github.com/LegadimaW/TodoApp.git
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

### Generate Prisma Client

```bash
npx prisma generate
```

### Sync Database

```bash
npx prisma db push
```

---


# Testing

This project uses **Jest** and **ts-jest** to verify the core functionality of the Todo application.

## Running the Tests

Install all dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```

Expected output:

```bash
PASS tests/todoActions.test.ts

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```

---

## Test Database

The tests use a separate SQLite database (`test.db`) to ensure that testing does not affect the application's main data.

Example test environment configuration:

```env
DATABASE_URL="file:./test.db"
```

---

## Implemented Tests

### Task Creation Test
Verifies that a new task can be created successfully and that newly created tasks are not archived by default.

### Task Archiving Test
Verifies that a task can be archived and that the archived flag is updated correctly.

### Overdue Task Test
Verifies that a task with a due date in the past and a status other than `Complete` is identified as overdue.

### Completed Task Rule Test
Verifies that a completed task is not considered overdue even if its due date has passed.

---

## Test Structure

```text
tests/
└── todoActions.test.ts

jest.config.js
.env.test
```

---

## Technologies Used for Testing

- Jest
- ts-jest
- Prisma ORM
- SQLite

---

## Requirement Coverage

The test suite satisfies the project testing requirements by:

- Providing more than three meaningful tests
- Testing real application behaviour
- Testing task archiving functionality
- Testing overdue task logic
- Running deterministically
- Using a separate throwaway database
- Running successfully using:

```bash
npm test
```

All tests pass successfully and can be executed on any machine after installing the project dependencies.

## Author
Wilson Legadima
Software Design Project

University of the Witwatersrand

Developed using Next.js, Prisma, and SQLite.
