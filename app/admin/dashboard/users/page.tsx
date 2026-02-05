"use client";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UsersPage = () => {
  const userInfo = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (userInfo?.role === "user") {
      router.push("/");
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users Management</h1>
      <p className="text-gray-600 mb-6">Manage all registered users</p>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600">
          Users management features coming soon...
        </p>
      </div>
    </div>
  );
};

export default UsersPage;
