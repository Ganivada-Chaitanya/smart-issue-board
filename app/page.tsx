import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Smart Issue Board</h1>
      <p className="mt-2">Please login to continue.</p>

      <div className="mt-4 space-x-4">
        <Link
          href="/login"
          className="bg-black text-white px-4 py-2 inline-block"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="border px-4 py-2 inline-block"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
