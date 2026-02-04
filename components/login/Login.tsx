"use client";
import { Button } from "@/components/ui/button";

import { auth, db, googleProvider } from "@/lib/firebase";
import { useUserStore } from "@/store/UserStore";
import { signInWithPopup } from "firebase/auth";
import ProfileBtn from "../profile/ProfileBtn";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const page = () => {
  // subscribe to user so component updates automatically on login/logout
  const userInfo = useUserStore((state) => state.user);
  const { setUser } = useUserStore();

  const handelGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Check if user already exists in Firestore
      try {
        const userQuery = query(
          collection(db, "users"),
          where("id", "==", result.user.uid),
        );
        const querySnapshot = await getDocs(userQuery);

        // Only save to Firestore if user doesn't exist
        if (querySnapshot.empty) {
          await addDoc(collection(db, "users"), {
            id: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            role: "user",
            photoUrl: result.user.photoURL,
            createdAt: new Date(),
          });
          console.log("New user added to Firestore");
        } else {
          console.log("User already exists in Firestore");
        }
      } catch (e) {
        console.error("Error checking/adding user to Firestore: ", e);
      }

      // Update local zustand store
      setUser({
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        role: "user",
        photoUrl: result.user.photoURL,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("popup-closed-by-user")
      ) {
        console.error("you closed the popup window");
      } else if (
        error instanceof Error &&
        error.message.includes("network-error")
      ) {
        console.error("No internet Connection");
      } else {
        alert("Failed to sign in with Google, Contact Support");
        throw new Error("Failed to sign in with Google");
        console.log(error);
      }
    }
  };

  // no local effect needed; subscription keeps UI in sync

  return (
    <>
      {userInfo ? (
        <ProfileBtn />
      ) : (
        <Button
          className="w-full cursor-pointer "
          variant={"outline"}
          onClick={handelGoogle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign Up With Google
        </Button>
      )}
    </>
  );
};

export default page;
