"use client";
import AdminSideBar from "@/components/AdminSideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  // useEffect(() => {
  //   const isAdmin = localStorage.getItem("admin_access");
  //   if (!isAdmin) router.push("/admin/login");
  // }, [router]);

  return (
    <main className="flex items-center justify-center max-h-screen">
      <div className="w-full h-screen sm:grid grid-cols-8 justify-between">
        <AdminSideBar />
        <div className=" col-span-6 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
