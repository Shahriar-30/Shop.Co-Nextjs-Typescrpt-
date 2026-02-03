"use client";

import {
  Menu,
  PanelRightClose,
  RectangleGogglesIcon,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchNav from "../navbar/SearchNav";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/UserStore";

const ProfileBtn = () => {
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
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex justify-between items-center">
            <span>Menu</span>
            <DrawerClose asChild>
              <PanelRightClose />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="hidden"></DrawerDescription>
        <div className="px-4 flex flex-col  gap-2 ">
          {/* ✅ NO button wrapping */}
          <SearchNav text={"Search"} />

          <Link href="/cart">
            <Button variant="ghost" className="w-full text-md">
              <ShoppingCart />
              Cart
            </Button>
          </Link>
          <Link href="/shipments">
            <Button variant="ghost" className="w-full text-md">
              <Truck />
              Shipments
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" className="w-full text-md">
              <User />
              Profile
            </Button>
          </Link>

          {userInfo?.role === "admin" ? (
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="w-full text-md">
                <RectangleGogglesIcon />
                Admin Panel
              </Button>
            </Link>
          ) : (
            <hr />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileBtn;
