"use client";
import { useUserStore } from "@/store/UserStore";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";

const AdminSection = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useUserStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (userInfo?.role === "user") {
      router.push("/");
    }
  });

  const adminMenus = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Products", href: "/admin/dashboard/products", icon: "📦" },
    { label: "Orders", href: "/admin/dashboard/orders", icon: "🛒" },
    { label: "Users", href: "/admin/dashboard/users", icon: "👥" },
    { label: "Analytics", href: "/admin/dashboard/analytics", icon: "📈" },
    { label: "Settings", href: "/admin/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex my-5 gap-4">
      {/* Sidebar */}
      <div className="w-64 bg-[#eee] rounded-lg p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          {adminMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === menu.href
                  ? "bg-blue-500 text-white"
                  : "hover:bg-[#ddd]"
              }`}
            >
              <span>{menu.icon}</span>
              <span>{menu.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">{children}</div>
    </div>
  );
};

export default AdminSection;
