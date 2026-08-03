"use client";

import { useRouter } from "next/navigation";
import { archiveTodo } from "@/src/lib/todoActions";

interface ArchiveButtonProps {
  id: number;
}

export default function ArchiveButton({
  id,
}: ArchiveButtonProps) {
  const router = useRouter();

  const handleArchive = async () => {
    const confirmed = window.confirm(
      "Archive this task?"
    );

    if (!confirmed) return;

    try {
      await archiveTodo(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to archive task:", error);
    }
  };

  return (
    <button
      onClick={handleArchive}
      className="btn btn-warning text-white min-w-[90px] btn-sm"
    >
      Archive
    </button>
  );
}