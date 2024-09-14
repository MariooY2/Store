"use client";

import DeletebyID from "@/Backend/actions/DeleteItembyID";
import { useRouter } from "next/navigation";

export default function DeleteButton({ ID }: { ID: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await DeletebyID(ID);
      console.log("Activity deleted, refreshing...");
     // router.refresh();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
    >
      Delete
    </button>
  );
}
