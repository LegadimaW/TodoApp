"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTodo } from "../../src/lib/todoActions";


const AddTask = () => {

  const router = useRouter();

  const [status, setStatus] = useState("Todo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [dueDate, setDueDate] = useState("");

  const openModal = () => {
    const modal = document.getElementById("my_modal") as HTMLDialogElement;
    modal?.showModal();
  };

  const handleAddTask = async () => {
    if (!title.trim()) return;

    try {

        await createTodo({
          title,
          description,
          topic,
          dueDate,
          status,
        });

        setTitle("");
        setDescription("");
        setTopic("");
        setDueDate("");
        setStatus("Todo");

        const modal = document.getElementById(
        "my_modal"
        ) as HTMLDialogElement;

        modal?.close();
        router.refresh();

    } catch (error) {
        console.error("Failed to create task:", error);
    }
};

  return (
    <div>
    <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box max-w-2xl">
    
      <div className="space-y-4">

        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Task Title</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Finish Software Design Lab"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        

        {/* Topic */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Topic</span>
          </label>

          <select
            className="select select-bordered w-full"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Select a topic</option>
            <option>University</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Project</option>
            <option>Health</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Due Date</span>
          </label>

          <input
            type="date"
            className="input input-bordered w-full"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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


        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>

          <textarea
            placeholder="Provide additional details about this task..."
            className="textarea textarea-bordered w-full h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

      </div>

      <div className="modal-action">
        <button
          onClick={handleAddTask}
          className="btn btn-primary"
        >
          Save Task
        </button>

        <form method="dialog">
          <button className="btn btn-outline">
            Cancel
          </button>
        </form>
      </div>
    </div>
    </dialog>

    <button onClick={openModal} className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg" > Add Task </button>
    </div>
  );
};

export default AddTask;1