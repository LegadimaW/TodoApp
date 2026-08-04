
# Database Design

## Overview

The application uses a SQLite database managed through Prisma ORM. Since the application is designed for a single local user, all task information is stored in a single table called `Todo`.

## Schema

### Todo Table

| Column | Type | Description |
|----------|----------|----------|
| id | Integer | Primary key used to uniquely identify each task. |
| title | String | The title of the task. |
| description | String (nullable) | Additional information describing the task. |
| topic | String (nullable) | Category assigned to the task, such as University, Work, Personal, Project, or Health. |
| dueDate | DateTime (nullable) | The date by which the task should be completed. |
| status | Enum | Represents the current state of the task. Allowed values are Todo, InProgress, and Complete. |
| archived | Boolean | Indicates whether the task has been archived. |
| createdAt | DateTime | Stores the date and time when the task was created. |

## Entity Relationship Diagram

Since the application only contains one table, there are currently no relationships between tables.

```text
+------------------+
|       Todo       |
+------------------+
| id (PK)          |
| title            |
| description      |
| topic            |
| dueDate          |
| status           |
| archived         |
| createdAt        |
+------------------+
```

## Design Decisions

### Task Status

The application uses a fixed set of task statuses:

- Todo
- InProgress
- Complete

These statuses are implemented as an enum to ensure that users cannot create custom status values. This satisfies the project requirement that task statuses are fixed and not user-customisable.

### Archiving

Tasks are never permanently deleted. Instead, the `archived` field is set to `true` when a task is archived. Archived tasks remain stored in the database and can still be viewed separately from active tasks.

### Overdue Tasks

Overdue tasks are not stored as a database field and are not treated as a task status. Instead, the application determines whether a task is overdue by comparing the current date with the task's due date and checking whether the task has already been completed.

This approach avoids storing derived information and keeps the database design simple and consistent.

### Persistence

All task data is stored in the SQLite database file. Because the data is stored on disk rather than in application memory, tasks remain available even after the application is stopped and restarted. This satisfies the persistence requirement of the project.
