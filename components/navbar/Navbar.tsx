import { Button } from "../ui/button";

import Link from "next/link";
import SearchNav from "./SearchNav";
import MenuBar from "./MenuBar";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className=" py-3 flex items-center justify-between bg-white text center border-b text-black ">
      <Link href={"/"}>
        <p className="font-bold text-xl">Shop.Co</p>
      </Link>
      <div className="flex items-center justify-center gap-3 lg:gap-6">
        <SearchNav />
        <Link href={"/cart"}>
          <ShoppingCart className="hidden lg:block" />
        </Link>
        <Link href={"/login"}>
          <Button className="font-mono bg-black  text-white cursor-pointer">
            Login
          </Button>
        </Link>
        <div className="lg:hidden">
          <MenuBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
