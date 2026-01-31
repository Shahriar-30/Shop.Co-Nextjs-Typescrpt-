import HomeCard from "@/components/home/HomeCard";
import NewsLetter from "@/components/home/NewsLetter";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className=" ">
      {/* top-hero */}
      <div className="w-full h-screen flex flex-col items-center justify-center relative ">
        <h1 className="text-3xl font-bold w-smd:mx-auto text-center  font-mono">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="text-center mt-4 text-sm w-[200px] sm:w-[400px] mx-auto font-mono">
          Shop the latest trends in fashion and find clothes that match your
          personal style.
        </p>
        <Link href="/products">
          <Button className="mt-6 bg-black text-white w-32 cursor-pointer font-mono hover:bg-gray-800">
            <ShoppingBasket />
            Shop Now
          </Button>
        </Link>
        <Image
          src="/star.jpg"
          alt="star Image"
          width={40}
          height={40}
          className="absolute bottom-[20%] right-[10%] "
        />
        <Image
          src="/star.jpg"
          alt="star Image"
          width={40}
          height={40}
          className="absolute top-[20%] left-12"
        />
      </div>
      {/* middle-hero */}
      <div className="relative md:h-screen w-full ">
        <Image
          src="/heroBanner.jpg"
          alt="banner Image"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover absolute top-0"
        />
        <div className="relative z-10 top-[-50px] flex flex-col py-20 gap-1.5 px-3">
          <h2 className="text-xl lg:text-6xl font-bold text-black   font-mono">
            SUMMER SALE IS ON!
          </h2>
          <p className="text-black lg:text-4xl w-[200px] sm:w-[400px]   font-mono">
            Up to 50% off on selected items. Don't miss out!
          </p>
          <Link href="/products">
            <Button className="bg-black text-2xl text-white  cursor-pointer font-mono hover:bg-gray-800">
              <ShoppingBasket />
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
      {/* new arrivals */}
      <HomeCard title="New Arrivals" start={0} end={3} />
      {/* Top Selling */}
      <HomeCard title="Top Selling" start={3} end={6} />
      {/* news letter */}
      <NewsLetter />
    </div>
  );
};

export default page;
