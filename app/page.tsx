
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import Link from "next/link";
import {
  getTodos,
  getArchivedCount,
  getArchivedTodos,
} from "../src/lib/todoActions";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    view?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

  const view = params.view || "active";
  const sort = params.sort || "status";

  const archivedCount = await getArchivedCount();

  let todos =
    view === "archived"
      ? await getArchivedTodos()
      : await getTodos();

  // Sorting
  if (sort === "status") {
    const statusOrder = {
    Todo: 0,
    InProgress: 1,
    Complete: 2,
  };

  todos.sort(
    (a, b) =>
      statusOrder[a.status] -
      statusOrder[b.status]
  );
  }

  if (sort === "dueDate") {
    todos.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return (
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
      );
    });
  }

  if (sort === "topic") {
    todos.sort((a, b) =>
      (a.topic || "").localeCompare(
        b.topic || ""
      )
    );
  }

  return (
    <main className="flex min-h-[70vh] max-w-7xl flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            TodoApp
          </h1>

          <p className="text-base-content/70">
            {todos.length}{" "}
            {view === "archived"
              ? "archived"
              : "active"}{" "}
            tasks
          </p>
        </div>

        <AddTask />
      </div>

      {/* Tabs + Sort */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="tabs tabs-box bg-base-200 shadow w-fit">
          <Link
            href={`/?sort=${sort}`}
            className={`tab ${
              view === "active"
                ? "tab-active"
                : ""
            }`}
          >
            Active
          </Link>

          <Link
            href={`/?view=archived&sort=${sort}`}
            className={`tab ${
              view === "archived"
                ? "tab-active"
                : ""
            }`}
          >
            Archived ({archivedCount})
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            Sort by
          </span>

          <div className="join">
            <Link
              href={`/?view=${view}&sort=status`}
              className={`btn btn-sm join-item ${
                sort === "status"
                  ? "bg-blue-600 font-semibold text-white"
                  : ""
              }`}
            >
              Status
            </Link>

            <Link
              href={`/?view=${view}&sort=dueDate`}
              className={`btn btn-sm join-item ${
                sort === "dueDate"
                  ? "bg-blue-600 font-semibold text-white"
                  : ""
              }`}
            >
              Due Date
            </Link>

            <Link
              href={`/?view=${view}&sort=topic`}
              className={`btn btn-sm join-item ${
                sort === "topic"
                  ? "bg-blue-600 font-semibold text-white"
                  : ""
              }`}
            >
              Topic
            </Link>
          </div>
        </div>
      </div>

      <TodoList tasks={todos} />
    </main>
  );
}

