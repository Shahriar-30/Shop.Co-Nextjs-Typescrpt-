"use client";
import CreateProduct from "@/components/admin/CreateProduct";
import ViewAllProduct from "@/components/admin/ViewAllProduct";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProductsPage = () => {
  const userInfo = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (userInfo?.role === "user") {
      router.push("/");
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Products Management</h1>
      <p className="text-gray-600 mb-6">View and manage your products</p>
      <CreateProduct />
      <p className="text-gray-600 mb-6">All Products</p>
      <ViewAllProduct />
    </div>
  );
};

export default ProductsPage;
