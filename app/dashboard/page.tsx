"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getAllIssues, Issue } from "@/lib/issues";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        getAllIssues().then(setIssues);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>

      <div className="space-x-4">
        <button
          onClick={() => router.push("/create-issue")}
          className="bg-black text-white px-4 py-2"
        >
          Create Issue
        </button>

        <button
          onClick={async () => {
            await signOut(auth);
            router.push("/login");
          }}
          className="border px-4 py-2"
        >
          Logout
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Issues</h2>

        {issues.length === 0 && <p>No issues yet.</p>}

        <ul className="space-y-3">
          {issues.map((issue) => (
            <li key={issue.id} className="border p-3">
              <h3 className="font-bold">{issue.title}</h3>
              <p>{issue.description}</p>
              <p className="text-sm">
                Priority: {issue.priority} | Status: {issue.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
