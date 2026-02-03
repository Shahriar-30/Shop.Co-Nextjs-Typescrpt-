"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/UserStore";

const page = () => {
  let [userInfo, setUserInfo] = useState<any>(null);

  let { setUser, getUser } = useUserStore();

  let userVali = async () => {
    let existingUser = getUser();
    if (!existingUser) {
      return setUserInfo(null);
    }
    setUserInfo(existingUser);
  };

  useEffect(() => {
    userVali();
  }, [userInfo]);
  return <div>profile</div>;
};

export default page;
