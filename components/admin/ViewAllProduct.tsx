import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ViewAllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        } as Product);
      });
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setDeletingId(productId);
    try {
      await deleteDoc(doc(db, "products", productId));
      // Remove from local state
      setProducts(products.filter((p) => p.id !== productId));
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading products...</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.length === 0 ? (
        <div className="col-span-full text-center text-gray-500">
          No products found
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="p-3 border-2 border-black rounded">
            <Image
              src={product.image}
              width={100}
              height={100}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="font-bold text-lg mt-2">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <Button
              className="w-full bg-red-500 text-white mt-2 disabled:opacity-50"
              variant="destructive"
              onClick={() => handleDeleteProduct(product.id)}
              disabled={deletingId === product.id}
            >
              {deletingId === product.id ? "Deleting..." : "Delete"}
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewAllProduct;
