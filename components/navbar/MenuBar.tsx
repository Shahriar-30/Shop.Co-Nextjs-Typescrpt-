"use client";

import { Menu, PanelRightClose } from "lucide-react";
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

const MenuBar = () => {
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
        <div className="px-4 flex flex-col gap-3 ">
          {/* ✅ NO button wrapping */}
          <SearchNav text={"Search"} />

          <Link href="/cart">
            <Button variant="outline" className="w-full">
              Cart
            </Button>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuBar;
