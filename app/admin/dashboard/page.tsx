"use client";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const userInfo = useUserStore((state) => state.user);

  let router = useRouter();

  useEffect(() => {
    if (userInfo?.role != "admin") {
      router.push("/");
    }
  });

  return <div>dashboard</div>;
};

export default page;
