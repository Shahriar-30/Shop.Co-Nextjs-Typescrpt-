"use client";
import NewsLetter from "@/components/home/NewsLetter";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  link: string;
}

const Page = () => {
  const [data, setData] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setData(JSON.parse(cart));
    }
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl  font-bold">Cart</h1>
      <div className="flex flex-col md:flex-row gap-10 mt-5">
        {data.length > 0 ? (
          <div>
            {data.map((item) => (
              <div
                key={item.id}
                className="border p-2 m-2 flex gap-2.5 md:w-[400px]"
              >
                <Image
                  src={item.link}
                  alt={item.name}
                  width={120}
                  height={100}
                />
                <div>
                  <h2 className="text-xl font-mono font-bold">{item.name}</h2>
                  <p className="text-xl font-bold">Price: ${item.price}</p>
                  <p className="text-xl font-bold">Quantity: {item.quantity}</p>
                  <Button
                    className="mt-2 bg-red-500 hover:bg-red-600 "
                    variant={"default"}
                    onClick={() => {
                      const updatedCart = data.filter(
                        (cartItem) => cartItem.id !== item.id,
                      );
                      setData(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="md:w-[400px]">Your cart is empty</p>
        )}
        <div className="w-[300px]">
          <div>
            <h2 className="text-xl font-bold">
              Total Amount: $
              {data.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </h2>
            <p className="text-green-600 font-bold">Shipping is Free</p>
            <Button
              className="w-full mt-4 bg-green-500 hover:bg-green-600 "
              variant={"default"}
              onClick={() => {
                alert("This is Demo Project");
              }}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
      <div className="my-8">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Page;
