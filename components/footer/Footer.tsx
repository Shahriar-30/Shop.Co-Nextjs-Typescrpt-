import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#F0F0F0] w-full pt-12 px-3 pb-3">
      <div className="py-6">
        <div className="flex flex-col lg:px-8 lg:flex-row lg:justify-between gap-2">
          <div>
            <p className="text-3xl font-extrabold font-mono">SHOP.CO</p>
            <p className="text-sm mt-2 max-w-50">
              We have clothes that suits your style and which you're proud to
              wear. From women to men
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={"/"}>
              <Facebook color="#000" size={30} />
            </Link>
            <Link href={"/"}>
              <Instagram color="#000" size={30} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:place-items-center md:grid-cols-4 gap-6 mt-6">
          <div className="flex flex-col gap-2 mt-6  ">
            <p className="font-bold mt-4">COMPANY</p>
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Contact</Link>
            <Link href={"/"}>Careers</Link>
          </div>
          <div className="flex flex-col gap-2 mt-6 ">
            <p className="font-bold mt-4">HELP</p>
            <Link href={"/"}>Support</Link>
            <Link href={"/"}>Shipping</Link>
            <Link href={"/"}>Teams & Conditions</Link>
          </div>
          <div className="flex flex-col gap-2 mt-6 ">
            <p className="font-bold mt-4">FAQ</p>
            <Link href={"/"}>Account</Link>
            <Link href={"/"}>Manage Deliveries</Link>
            <Link href={"/"}>Orders</Link>
            <Link href={"/"}>Payments</Link>
          </div>
          <div className="flex flex-col gap-2 mt-6 ">
            <p className="font-bold mt-4">RESOURCES</p>
            <Link href={"/"}>Free eBooks</Link>
            <Link href={"/"}>Developer Guide</Link>
            <Link href={"/"}>How to - Blog</Link>
            <Link href={"/"}>Youtube Playlist</Link>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <p className="text-center text-sm">
          © 2023 SHOP.CO. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
