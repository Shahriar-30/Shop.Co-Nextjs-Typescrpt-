"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CardItem from "../CardItem";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  [key: string]: any;
}

const HomeCard = ({
  title,
  start,
  end,
}: {
  title: string;
  start: number;
  end: number;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData: Product[] = [];
        querySnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            ...doc.data(),
          } as Product);
        });
        // Only take 3 items
        setProducts(productsData.slice(start, end));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center font-mono mb-8">{title}</h2>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-3 gap-6 mb-20">
        {products.map((item) => (
          <CardItem
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
