import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type Issue = {
  id?: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Done";
  assignedTo: string;
  createdBy: string;
  createdAt?: any;
};

export async function createIssue(issue: Issue) {
  await addDoc(collection(db, "issues"), {
    ...issue,
    createdAt: serverTimestamp(),
  });
}

export async function getAllIssues(): Promise<Issue[]> {
  const q = query(
    collection(db, "issues"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Issue),
  }));
}
