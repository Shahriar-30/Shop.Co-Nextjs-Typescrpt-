"use client";

import {
  Menu,
  PanelRightClose,
  RectangleGogglesIcon,
  Shirt,
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
import SearchNav from "./SearchNav";
import Login from "../login/Login";
import { useUserStore } from "@/store/UserStore";

const MenuBar = () => {
  // subscribe to the user in the store so component re-renders on login/logout
  const userInfo = useUserStore((state) => state.user);

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
        <div className="px-4 flex flex-col gap-2 ">
          {/* ✅ NO button wrapping */}
          <SearchNav text={"Search"} />
          <Link href="/products">
            <Button variant="ghost" className="w-full">
              <Shirt />
              All Products
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" className="w-full">
              <ShoppingCart />
              Cart
            </Button>
          </Link>
          {userInfo ? (
            <div className="flex flex-col gap-2">
              <Link href="/shipments">
                <Button variant="ghost" className="w-full">
                  <Truck />
                  Shipments
                </Button>
              </Link>

              <Link href="/profile">
                <Button variant="ghost" className="w-full">
                  <User />
                  Profile
                </Button>
              </Link>
            </div>
          ) : (
            <Login />
          )}
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

export default MenuBar;
