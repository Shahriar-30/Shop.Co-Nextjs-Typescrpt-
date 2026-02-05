"use client";
import NewsLetter from "@/components/home/NewsLetter";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  [key: string]: any;
}

const Page = () => {
  const router = useRouter();
  const userInfo = useUserStore((state) => state.user);
  const [data, setData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userInfo) {
          setLoading(false);
          return;
        }

        const cartDocRef = doc(db, "cart", userInfo.id);
        const cartDocSnap = await getDoc(cartDocRef);

        if (cartDocSnap.exists()) {
          setData(cartDocSnap.data().items || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userInfo]);

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      if (!userInfo) {
        alert("User not found");
        return;
      }

      if (!address.trim()) {
        alert("Please enter your address");
        setIsProcessingPayment(false);
        return;
      }

      if (data.length === 0) {
        alert("Your cart is empty");
        setIsProcessingPayment(false);
        return;
      }

      // Delete cart from Firebase
      const cartDocRef = doc(db, "cart", userInfo.id);
      await deleteDoc(cartDocRef);

      // Clear local state
      setData([]);
      setAddress("");
      setShowPaymentSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleNavigateToShipments = () => {
    setShowPaymentSuccess(false);
    router.push("/shipments");
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      if (!userInfo) return;

      const updatedCart = data.filter((item) => item.id !== productId);
      setData(updatedCart);

      // Update Firebase
      const cartDocRef = doc(db, "cart", userInfo.id);
      await setDoc(
        cartDocRef,
        {
          items: updatedCart,
        },
        { merge: true },
      );
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Please log in to view your cart</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Loading cart...</p>
      </div>
    );
  }

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
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={100}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-[120px] h-[100px] bg-gray-200 flex items-center justify-center">
                    No image
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-mono font-bold">{item.name}</h2>
                  <p className="text-xl font-bold">Price: ${item.price}</p>
                  <p className="text-xl font-bold">Quantity: {item.quantity}</p>
                  <p className="text-lg font-bold">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    className="mt-2 bg-red-500 hover:bg-red-600 "
                    variant={"default"}
                    onClick={() => handleRemoveItem(item.id)}
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
          <div className="border p-4 rounded">
            <h2 className="text-xl font-bold">
              Total Amount: $
              {data
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </h2>
            <p className="text-green-600 font-bold mt-2">Shipping is Free</p>

            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">
                Delivery Address
              </label>
              <textarea
                className="w-full border border-black rounded p-2 focus:outline-none resize-none"
                placeholder="Enter your delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              className="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              variant={"default"}
              onClick={handlePayment}
              disabled={
                isProcessingPayment || data.length === 0 || !address.trim()
              }
            >
              {isProcessingPayment ? "Processing..." : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      </div>
      <div className="my-8">
        <NewsLetter />
      </div>

      <Dialog open={showPaymentSuccess} onOpenChange={setShowPaymentSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful! 🎉</DialogTitle>
            <DialogDescription asChild className="mt-4 space-y-4">
              <div>
                <p>Your payment has been processed successfully!</p>
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This is a test project. Your order has
                  been recorded and will be shipped to your provided address.
                </p>
                <div className="flex gap-3 mt-6">
                  <Button
                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleNavigateToShipments}
                  >
                    View Shipments
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentSuccess(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
