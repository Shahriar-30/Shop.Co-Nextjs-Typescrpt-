"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { ProductJson } from "@/data/Products";
import Link from "next/link";

const SearchNav = ({ text }: { text?: string }) => {
  const [search, setSearch] = useState("");

  const filteredProducts = ProductJson.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog>
      <DialogTrigger className="text-black flex gap-2 items-center justify-center">
        <Search width={24} className="cursor-pointer" />
        {text && text}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
          <DialogDescription>Search products by name</DialogDescription>

          <Input
            placeholder="Search for anything"
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogHeader>

        <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px]">
          {filteredProducts.length === 0 && search && (
            <p className="text-sm text-muted-foreground text-center">
              No products found
            </p>
          )}

          {filteredProducts.map((e) => (
            <Link
              href={`/products/${e.id}`}
              key={e.id}
              onClick={() => {
                const dialog = document.querySelector("dialog");
                if (dialog) {
                  dialog.close();
                }
              }}
            >
              <DialogClose asChild>
                <div className="w-full border p-2 flex items-center gap-2 hover:bg-muted cursor-pointer">
                  <Image alt={e.name} width={50} height={50} src={e.link} />
                  <div>
                    <p className="font-medium">{e.name}</p>
                    <p className="text-sm">${e.price}</p>
                  </div>
                </div>
              </DialogClose>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchNav;
