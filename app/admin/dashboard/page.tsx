"use client";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardHome = () => {
  const userInfo = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (userInfo?.role === "user") {
      router.push("/");
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage your shop from here</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📊 Analytics</h3>
          <p className="text-gray-600">Track your sales and performance</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📦 Products</h3>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">🛒 Orders</h3>
          <p className="text-gray-600">View and process customer orders</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
