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
import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string | number;
  name: string;
  image: string;
  price: number;
}

const SearchNav = ({ text }: { text?: string }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((e) =>
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
          {loading && (
            <p className="text-sm text-muted-foreground text-center">
              Loading products...
            </p>
          )}

          {!loading && filteredProducts.length === 0 && search && (
            <p className="text-sm text-muted-foreground text-center">
              No products found
            </p>
          )}

          {!loading &&
            filteredProducts.length === 0 &&
            !search &&
            products.length > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Start typing to search products
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
                  {e.image && (
                    <Image alt={e.name} width={50} height={50} src={e.image} />
                  )}
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
