"use client";
import { ProductJson } from "@/data/Products";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define Product interface (adjust based on your actual product structure)
interface Product {
  id: number;
  name: string;
  price: number;
  link: string;
  // Add other product properties as needed
}

interface CartItem extends Product {
  quantity: number;
}

const Page = () => {
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const foundProduct = ProductJson.find(
      (product) => product.id === Number(id),
    );
    setProduct(foundProduct || null);
  }, [id]);

  const handleAddToCart = () => {
    try {
      // Get cart from localStorage
      const cartData = localStorage.getItem("cart");
      let cart: CartItem[] = [];

      // Parse and validate cart data
      if (cartData) {
        const parsed = JSON.parse(cartData);
        // Ensure it's an array
        cart = Array.isArray(parsed) ? parsed : [];
      }

      // Find existing product
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product?.id,
      );

      if (existingProductIndex !== -1) {
        // Product already in cart, update quantity
        cart[existingProductIndex].quantity += counter;
      } else {
        // Product not in cart, add new entry
        if (product) {
          cart.push({ ...product, quantity: counter });
        }
      }

      // Save back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Optional: Show success message or feedback
      alert("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Reset cart if there's an error
      localStorage.setItem("cart", JSON.stringify([]));
      alert("Error adding to cart. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full md:px-13">
      {product ? (
        <div className="flex flex-col md:flex-row justify-between items-center w-full mt-12">
          <div className="relative w-[300px] h-[300px]">
            <Image
              src={product.link}
              alt={`Product ${id}`}
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
              className="bg-black text-white font-mono px-8 py-3 rounded-md hover:bg-gray-800 mt-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <p className="font-mono text-3xl font-bold">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Page;
