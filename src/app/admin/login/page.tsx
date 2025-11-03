"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminLogin() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      localStorage.setItem("admin_access", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid access code");
      toast.error("Invalid access code");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-16 rounded-xl shadow-lg bg-amber-500"
      >
        <h2 className="text-xl font-bold text-white text-center ">
          Admin Access
        </h2>
        <Input
          type="password"
          placeholder="Enter access code"
          className="px-3 py-2 rounded text-white"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error && (
          <p className="text-white text-center font-semibold text-sm">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="bg-black py-2 rounded text-white font-semibold hover:bg-gray-800 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
