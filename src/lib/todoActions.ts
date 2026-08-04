"use server";

import { prisma } from "../../src/lib/prisma";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "../../app/generated/prisma/client";
//post
export async function createTodo(data: {
  title: string;
  description: string;
  topic: string;
  dueDate: string;
  status: string;
}) {
  await prisma.todo.create({
    data: {
      title: data.title,
      description: data.description,
      topic: data.topic,
      status: data.status as TaskStatus,
      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : null,
    },
  });
}
//fetch tasks 
export async function getTodos() {
  return prisma.todo.findMany({
    where: {
      archived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
//Archive tasks
export async function archiveTodo(id: number) {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      archived: true,
    },
  });

  revalidatePath("/");
}

//count archive
export async function getArchivedCount() {
  return prisma.todo.count({
    where: {
      archived: true,
    },
  });
}

//get archived tasks
export async function getArchivedTodos() {
  return prisma.todo.findMany({
    where: {
      archived: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}


//edit tasks
export async function updateTask(
  id: number,
  data: {
    title: string;
    topic: string;
    description: string;
    dueDate: string;
    status: string;
  }
) {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      topic: data.topic,
      status: data.status as TaskStatus,
      description: data.description,
      dueDate: data.dueDate
        ? new Date(data.dueDate)
        : null,
    },
  });

  revalidatePath("/");
}
