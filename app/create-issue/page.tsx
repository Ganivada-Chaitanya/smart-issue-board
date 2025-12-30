"use client";

import { useState } from "react";
import { createIssue } from "@/lib/issues";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function CreateIssuePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    await createIssue({
      title,
      description,
      priority: priority as any,
      status: "Open",
      assignedTo,
      createdBy: auth.currentUser.email || "",
    });

    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">Create Issue</h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input className="w-full border p-2" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full border p-2" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <select className="w-full border p-2" onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input className="w-full border p-2" placeholder="Assigned To" onChange={(e) => setAssignedTo(e.target.value)} />
        <button className="w-full bg-black text-white p-2">Create Issue</button>
      </form>
    </div>
  );
}
