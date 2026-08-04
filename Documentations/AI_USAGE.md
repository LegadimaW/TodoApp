
# AI Usage

## Overview

ChatGPT was used as a development assistant during the implementation of the Todo application. AI assistance was used for planning, code generation, debugging, and design discussions. All generated code was reviewed, modified, and integrated manually.

---

# Planning

## Prompt

How should I implement task archiving while ensuring archived tasks remain viewable?

## AI Suggestion

Store an `archived` boolean field on each task and filter active tasks using `archived = false`.

## Decision

Accepted.

This matched the project requirement that tasks must not be deleted and should remain viewable after archiving.

---

# Code Generation

## Prompt

Generate a Prisma model for a task containing title, description, topic, due date, status, archived flag, and creation date.

## AI Suggestion

```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  topic       String?
  dueDate     DateTime?
  status      String
  archived    Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

## Decision

Modified.

The status field was later changed to an enum to enforce the fixed statuses required by the specification.

---

# Debugging

## Prompt

Prisma migration fails with:

"Drift detected: Your database schema is not in sync with your migration history."

## AI Suggestion

Inspect migration history and either reset the development database or create a migration that preserves existing data.

## Decision

Accepted.

The issue was caused by schema changes made before migration files were created.

---

# Rejected / Corrected AI Output

## Prompt

How should task status be implemented?

## AI Suggestion

Allow users to choose task status during task creation using a dropdown.

## Decision

Rejected.

After reviewing the project specification:

> Each task has one of three statuses: Todo, In-Progress, Complete. These are fixed; they are not user customisable.

I determined that allowing users to freely select a status when creating a task could conflict with the intended workflow.

The implementation was modified so that new tasks start as Todo and only transition through the predefined statuses.

---

# Overdue Task Design

## Prompt

How should overdue tasks be stored?

## AI Suggestion

Store an overdue flag in the database.

## Decision

Rejected.

The project requirements specify that overdue is not a status.

A derived approach was implemented instead:

```ts
const isOverdue =
  task.dueDate &&
  new Date(task.dueDate) < new Date() &&
  task.status !== "Complete";
```

This computes overdue status at runtime rather than storing it in the database.

---

# Summary

AI assistance was used for:

- Application architecture planning
- Prisma schema design
- React and Next.js component generation
- Tailwind CSS user interface implementation
- Prisma migration troubleshooting
- TypeScript error debugging
- Testing strategy discussions

All generated code was reviewed and adapted to satisfy the project requirements.
