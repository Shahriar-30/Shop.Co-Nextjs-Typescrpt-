"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  let router = useRouter();
  let [data, setData] = useState({
    username: "",
    password: "",
  });
  let [isInput, setIsInput] = useState({
    username: false,
    password: false,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handelLogIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data.username === "") {
      setIsInput({ ...isInput, username: true });
    }
    if (data.password === "") {
      setIsInput({ ...isInput, password: true });
    }
    if (data.username === "" && data.password === "") {
      setIsInput({ username: true, password: true });
    }
    if (data.username !== "" && data.password !== "") {
      if (validateEmail(data.username)) {
        router.push("/");
      } else {
        setIsInput({ ...isInput, username: true });
      }
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {/* make a cool login page */}
      <div className="border p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <form>
          <div className="flex justify-between items-center space-x-1.5">
            <label htmlFor="username" className="font-bold">
              Email:
            </label>
            <input
              type="email   "
              id="username"
              value={data.username}
              name="username"
              className={`border-2 font-mono ${isInput.username ? "border-red-500" : "border-black"}`}
              required
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
                setIsInput({ ...isInput, username: false });
              }}
            />
          </div>
          <br />
          <div className="flex justify-between items-center space-x-1.5">
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              name="password"
              className={`border-2 font-mono ${isInput.password ? "border-red-500" : "border-black"}`}
              required
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
                setIsInput({ ...isInput, password: false });
              }}
            />
          </div>
          <br />
          <Button
            type="submit"
            className="w-full"
            variant="default"
            onClick={handelLogIn}
          >
            Login
          </Button>
        </form>
        <Link
          href="/register"
          className="text-sm text-blue-500 hover:underline mt-4 block text-center"
        >
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
};

export default page;
