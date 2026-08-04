import {
  PrismaClient,
  TaskStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

describe("Todo App", () => {
  test("creates a task successfully", async () => {
    const todo = await prisma.todo.create({
      data: {
        title: "Software Design Lab",
        topic: "University",
      },
    });

    expect(todo.title).toBe("Software Design Lab");
    expect(todo.archived).toBe(false);
  });

  test("archives a task", async () => {
    const todo = await prisma.todo.create({
      data: {
        title: "Archive Me",
      },
    });

    await prisma.todo.update({
      where: { id: todo.id },
      data: { archived: true },
    });

    const archivedTodo =
      await prisma.todo.findUnique({
        where: { id: todo.id },
      });

    expect(archivedTodo?.archived).toBe(true);
  });

  test("detects overdue task", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const todo = await prisma.todo.create({
      data: {
        title: "Overdue Task",
        dueDate: yesterday,
        status: TaskStatus.Todo,
      },
    });

    const isOverdue =
      todo.dueDate! < new Date() &&
      todo.status !== TaskStatus.Complete;

    expect(isOverdue).toBe(true);
  });

  test("completed task is not overdue", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const todo = await prisma.todo.create({
      data: {
        title: "Completed Task",
        dueDate: yesterday,
        status: TaskStatus.Complete,
      },
    });

    const isOverdue =
      todo.dueDate! < new Date() &&
      todo.status !== TaskStatus.Complete;

    expect(isOverdue).toBe(false);
  });
});