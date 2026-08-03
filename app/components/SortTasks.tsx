"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortTasks() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "status";

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", e.target.value);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        Sort by
      </span>

      <select
        className="select select-bordered w-44"
        value={currentSort}
        onChange={handleSortChange}
      >
        <option value="status">Status</option>
        <option value="dueDate">Due Date</option>
        <option value="topic">Topic</option>
      </select>
    </div>
  );
}