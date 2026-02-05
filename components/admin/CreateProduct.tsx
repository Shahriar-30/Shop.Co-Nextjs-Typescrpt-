"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/UserStore";

const CreateProduct = () => {
  const userInfo = useUserStore((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  let [formError, setFormError] = useState(false);
  let [productData, setProductData] = useState({
    name: "",
    price: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProduct = async () => {
    if (!productData.name || !productData.price) {
      setFormError(true);
      return;
    }

    setIsLoading(true);

    if (!productData.price.match(/^[0-9]+(\.[0-9]+)?$/)) {
      setFormError(true);
      return;
    }

    if (!image) {
      alert("Select an image first");
      return;
    }

    try {
      // 1️⃣ Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "nextjs_unsigned");

      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dyjffr5bb/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const uploadData = await uploadRes.json();

      console.log("Cloudinary response:", uploadData);

      if (!uploadData.secure_url) {
        throw new Error(
          `Image upload failed: ${uploadData.error?.message || JSON.stringify(uploadData)}`,
        );
      }

      const imageUrl = uploadData.secure_url;

      // 2️⃣ Save product to Firestore
      await addDoc(collection(db, "products"), {
        userId: userInfo?.id,
        name: productData.name,
        price: parseFloat(productData.price),
        image: imageUrl, // 👈 saved here
        createdAt: new Date(),
      });

      // 3️⃣ Reset state
      setProductData({ name: "", price: "" });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFormError(false);

      console.log("Product Created with image:", imageUrl);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="border border-black py-3 px-6 rounded bg-blue-500 text-white cursor-pointer font-bold">
          Create New Products
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              {/* <input type="file" placeholder="choose product photo" /> */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="w-full rounded p-2 mb-2 focus:outline-none border border-black"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              <input
                type="text"
                placeholder="Product Name"
                className={`w-full rounded p-2 mb-2 focus:outline-none border border-black ${formError ? "border-red-500" : ""}`}
                value={productData.name}
                onChange={(e) => {
                  setProductData({ ...productData, name: e.target.value });
                  setFormError(false);
                }}
              />

              <input
                type="text"
                placeholder="Product Price"
                className={`w-full rounded p-2 mb-2 focus:outline-none border border-black ${formError ? "border-red-500" : ""}`}
                value={productData.price}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    price: e.target.value,
                  });
                  setFormError(false);
                }}
              />
              <Button
                variant={"default"}
                className="w-full bg-blue-800 text-white mt-2 disabled:opacity-50"
                onClick={handleCreateProduct}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProduct;
