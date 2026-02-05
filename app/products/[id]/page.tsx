"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/UserStore";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Define Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  [key: string]: any;
}

interface CartItem extends Product {
  quantity: number;
}

const Page = () => {
  const params = useParams();
  const { id } = params;
  const userInfo = useUserStore((state) => state.user);

  const [product, setProduct] = useState<Product | null>(null);
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (!id) return;

        const docRef = doc(db, "products", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          } as Product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setIsLoadingCart(true);
    try {
      if (!userInfo) {
        setShowLoginModal(true);
        setIsLoadingCart(false);
        return;
      }

      if (!product) {
        alert("Product not found");
        setIsLoadingCart(false);
        return;
      }

      const cartItem = {
        ...product,
        quantity: counter,
      };

      // Save to Firebase cart collection with userId as document ID
      const cartDocRef = doc(db, "cart", userInfo.id);
      const cartDocSnap = await getDoc(cartDocRef);

      let cartData: CartItem[] = [];

      if (cartDocSnap.exists()) {
        cartData = cartDocSnap.data().items || [];

        // Check if product already in cart
        const existingProductIndex = cartData.findIndex(
          (item) => item.id === product.id,
        );

        if (existingProductIndex !== -1) {
          // Update quantity
          cartData[existingProductIndex].quantity += counter;
        } else {
          // Add new product
          cartData.push(cartItem);
        }
      } else {
        // Create new cart document
        cartData = [cartItem];
      }

      // Save to Firebase
      await setDoc(
        cartDocRef,
        {
          userId: userInfo.id,
          email: userInfo.email,
          items: cartData,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      alert("Added to cart!");
      setCounter(1); // Reset counter
      setIsLoadingCart(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
      setIsLoadingCart(false);
    }
  };

  return (
    <>
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Please Log In</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild className="mt-4 space-y-4">
            <div className="flex flex-col gap-3 mt-6">
              <p className="font-bold">
                You need to log in to add items to your cart.
              </p>
              <Button
                variant="default"
                onClick={() => setShowLoginModal(false)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <div className="h-screen w-full md:px-13">
        {loading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <p className="font-mono text-3xl font-bold">Loading...</p>
          </div>
        ) : product ? (
          <div className="flex flex-col md:flex-row justify-between items-center w-full mt-12">
            <div className="relative w-[300px] h-[300px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="md:space-y-6 space-y-2.5 mt-6 md:mt-8">
              <h2 className="text-2xl font-bold md:text-4xl">{product.name}</h2>
              <p className="text-xl font-semibold md:text-2xl">
                ${product.price}
              </p>
              {/* Quantity selector */}
              <div className="flex items-center space-x-4">
                <button
                  className="bg-gray-200 px-4 py-2 rounded-md"
                  onClick={() => setCounter(counter > 1 ? counter - 1 : 1)}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{counter}</span>
                <button
                  className="bg-gray-200 px-4 py-2 rounded-md"
                  onClick={() => setCounter(counter + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-black text-white font-mono w-50 px-8 py-3 rounded-md hover:bg-gray-800 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={isLoadingCart}
              >
                {isLoadingCart ? "..." : "Add to Cart"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-screen">
            <p className="font-mono text-3xl font-bold">Product not found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
