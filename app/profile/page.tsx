"use client";
import { useUserStore } from "@/store/UserStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const page = () => {
  // subscribe to store user
  const userInfo = useUserStore((state) => state.user);
  const { clearUser } = useUserStore();

  const router = useRouter();

  const handelLogOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore signOut errors, still clear local state
      console.warn("Firebase signOut failed:", e);
    }
    clearUser();
    router.push("/");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center p-4">
      <Image
        src={userInfo?.photoUrl || "/avatar.png"}
        alt="hi"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h1 className="font-bold font-mono text-xl mt-5">
        {userInfo?.name || ""}
      </h1>
      <h1 className="font-bold font-mono text-xl mt-3">
        {userInfo?.email || ""}
      </h1>
      <Button
        className="w-full text-white bg-red-500 mt-8 md:w-[300px]"
        variant={"default"}
        onClick={handelLogOut}
      >
        Logout
      </Button>
    </div>
  );
};

export default page;
