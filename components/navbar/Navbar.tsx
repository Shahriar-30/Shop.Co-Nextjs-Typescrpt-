import { Button } from "../ui/button";

import Link from "next/link";
import SearchNav from "./SearchNav";
import MenuBar from "./MenuBar";
import { ShoppingCart } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    // filx  justify-between items-center py-3 bg-white border-b text-black

    <nav className=" py-3 flex items-center justify-between bg-white text center border-b text-black ">
      <Link href={"/"}>
        <p className="font-bold text-xl">Shop.Co</p>
      </Link>
      <div className="flex items-center justify-center gap-3 lg:gap-6">
        <SearchNav />
        <Link href={"/cart"}>
          <ShoppingCart className="hidden lg:block" />
        </Link>
        <div>
          <SignedOut>
            <SignInButton>
              <Button className="w-20 cursor-pointer">Login</Button>
            </SignInButton>
            {/* <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
              </button>
              </SignUpButton> */}
          </SignedOut>
          <SignedIn>
            <div className="mt-2">
              <UserButton />
            </div>
          </SignedIn>
        </div>
        <div className="lg:hidden">
          <MenuBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
