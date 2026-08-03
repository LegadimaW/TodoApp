"use client";

import { useState } from "react";
import { updateTask } from "@/src/lib/todoActions";

interface Todo {
  id: number;
  title: string;
  description: string | null;
  topic: string | null;
  dueDate: Date | null;
}

interface EditTaskProps {
  task: Todo;
}

export default function EditTask({ task }: EditTaskProps) {
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState(task.title);
  const [topic, setTopic] = useState(task.topic || "");
  const [description, setDescription] = useState(
    task.description || ""
  );

  const [dueDate, setDueDate] = useState(
    task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : ""
  );

  const handleUpdateTask = async () => {
    await updateTask(task.id, {
      title,
      topic,
      description,
      dueDate,
      status,
    });

    (
      document.getElementById(
        `edit_modal_${task.id}`
      ) as HTMLDialogElement
    )?.close();

    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() =>
          (
            document.getElementById(
              `edit_modal_${task.id}`
            ) as HTMLDialogElement
          )?.showModal()
        }
        className="btn bg-blue-600 text-white min-w-[90px] btn-sm"
      >
        Edit   
      </button>

      <dialog
        id={`edit_modal_${task.id}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">
            Edit Task
          </h3>

          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">
                  Task Title
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Topic
                </span>
              </label>

              <select
                className="select select-bordered w-full"
                value={topic}
                onChange={(e) =>
                  setTopic(e.target.value)
                }
              >
                <option value="">
                  Select a topic
                </option>
                <option>University</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Project</option>
                <option>Health</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Due Date
                </span>
              </label>

              <input
                type="date"
                className="input input-bordered w-full"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
              />
            </div>

             {/* Status */}
            <div>
            <label className="label">
                <span className="label-text font-medium">
                Status
                </span>
            </label>

            <select
                className="select select-bordered w-full"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="Todo">Todo</option>
                <option value="InProgress">
                In Progress
                </option>
                <option value="Complete">
                Complete
                </option>
            </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Description
                </span>
              </label>

              <textarea
                className="textarea textarea-bordered w-full h-32"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="modal-action">
            <button
              onClick={handleUpdateTask}
              className="btn btn-primary"
            >
              Update Task
            </button>

            <form method="dialog">
              <button className="btn btn-outline">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}