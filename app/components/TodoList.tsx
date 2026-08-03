
import ArchiveButton from "./ArchiveButton";
import EditTask from "./EditTask";

interface Todo {
  id: number;
  title: string;
  description: string | null;
  topic: string | null;
  dueDate: Date | null;
  status: string;
  createdAt: Date;
}

interface TodoListProps {
  tasks: Todo[];
}

const TodoList = ({ tasks }: TodoListProps) => {
  return (
    <div className="mt-8 grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => {
        const isOverdue =
          task.dueDate &&
          new Date(task.dueDate) < new Date() &&
          task.status !== "Complete";

        return (
          <div key={task.id} className="hover-3d">
            <div
              className={`card bg-base-100 shadow-2xl rounded-2xl border ${
                isOverdue
                  ? "border-red-500 border-2"
                  : "border-base-300"
              }`}
            >
              <div className="h-2 rounded-t-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title text-xl">
                    {task.title}
                  </h2>

                  <div className="flex gap-2">
                    <div
                      className={`badge ${
                        task.status === "Complete"
                          ? "badge-success"
                          : task.status === "InProgress"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {task.status === "InProgress"
                        ? "In Progress"
                        : task.status}
                    </div>

                    {isOverdue && (
                      <div className="badge badge-error text-white">
                        Overdue
                      </div>
                    )}
                  </div>
                </div>

                <div className="badge badge-primary badge-outline">
                  {task.topic || "General"}
                </div>

                <p className="mt-2 text-sm text-base-content/70">
                  {task.description ||
                    "No description provided"}
                </p>

                <div className="divider my-1"></div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Due Date
                    </span>

                    <span
                      className={
                        isOverdue
                          ? "text-red-600 font-semibold"
                          : ""
                      }
                    >
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        : "Not Set"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">
                      Created
                    </span>

                    <span>
                      {new Date(
                        task.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <EditTask task={task} />

                  <ArchiveButton id={task.id} />
                </div>
              </div>
            </div>

            {/* Required for DaisyUI 3D Effect */}
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;

