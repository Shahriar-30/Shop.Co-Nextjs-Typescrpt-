"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ShovelIcon } from "lucide-react";
// import { useProductStore } from "@/store/ProductStore";

const CardItem = ({ item }: { item: any }) => {
  // let { addProduct } = useProductStore();
  // const handelCard = () => {
  //   localStorage.setItem("cart", JSON.stringify(item)); //add tproduct not working ai help
  // };

  return (
    <Card className="w-[300px] ">
      <CardHeader>
        <CardTitle>
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </CardTitle>
        <CardDescription className="hidden">Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{item.name}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1">
        <p className="text-lg font-bold">${item.price}</p>
        <CardAction>
          <Link href={`/products/${item.id}`}>
            <Button variant={"default"}>
              <ShovelIcon className="h-4 w-4" />
              View Product
            </Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
