import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useUserStore } from "@/store/UserStore";

const CreateProduct = () => {
  let [formError, setFormError] = useState(false);
  let [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handelCreateProduct = async () => {
    const userInfo = useUserStore((state) => state.user);

    if (!productData.name || !productData.description || !productData.price) {
      setFormError(true);
      return;
    }

    if (!productData.price.match(/[0-9]+/g)) {
      setFormError(true);
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        userId: userInfo?.id,
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error creating product: ", error);
    }

    // Proceed with product creation logic
    console.log("Product Created:", productData);
    // Reset form
    setProductData({ name: "", description: "", price: "" });
    setFormError(false);
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
                placeholder="Product Description"
                className={`w-full rounded p-2 mb-2 focus:outline-none border border-black ${formError ? "border-red-500" : ""}`}
                value={productData.description}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  });
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
                className="w-full bg-blue-800 text-white mt-2"
                onClick={handelCreateProduct}
              >
                Create Product
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProduct;
