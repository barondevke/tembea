"use client";

import Link from "next/link";
import { Loader2, Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Fix the import path - remove the .tsx extension
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/userSlicer";
import { UserType } from "@/types/types";
import axios from "axios";
import { Cookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";
import api from "@/api";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState<
    "sign-in" | "sign-up" | null
  >(null);
  const pathname = usePathname();

  if (pathname.includes("/admin")) {
    return <></>;
  }
  const router = useRouter();
  const cookie = new Cookies();
  const dispatch = useDispatch<AppDispatch>();
  const user: UserType = useSelector((state: RootState) => state.user);



  const signOut = async () => {
    try {
      // ✅ Call backend to destroy session
      await api.post(
        "api/user/sign-out"
      );

      // ✅ Clear Redux store
      dispatch(setUser({} as UserType));

      // ✅ Optional: Clear any client cookies (just in case)
      cookie.remove("user_id");

      // ✅ Redirect
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const fetchUserData = async () => {
    console.log("fetching user")
    try {
      const userId = cookie.get("user_id");
      console.log(userId)
      if (userId) {
        const response = await api.get(
          `https://tembezi.co.ke/api/user/get-user/${userId}`
        );
        const res = response.data;
        console.log(response.data,"this is response")
        if (res.proceed) {
          dispatch(setUser(res.data));
        }
      }
    } catch (error) {
      console.error("User not signed in or forbidden:", error);
    }
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleClick = (page: string, button: "sign-in" | "sign-up") => {
    setLoadingButton(button);
    router.push(page);
  };

  useEffect(() => {
    setLoadingButton(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/tours"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tours
                </Link>
                <Link
                  href="/about"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="block px-2 py-1 text-lg font-medium hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
          <img
  src="/logo.png"
  alt="Logo"
  className="h-12 w-12 text-purple-600"
/>

            <span className="font-bold text-xl">Tembezi</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-purple-600">
            Home
          </Link>
          <Link
            href="/tours"
            className="text-sm font-medium hover:text-purple-600"
          >
            Tours
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-purple-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-purple-600"
          >
            Contact
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium hover:text-purple-600"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user.name ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Avatar>
                  <AvatarImage
                    src={user.profile_image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant={"ghost"}
                onClick={() => handleClick("/sign-in", "sign-in")}
                disabled={loadingButton === "sign-in"}
                className="flex items-center gap-2"
              >
                {loadingButton === "sign-in" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {loadingButton === "sign-in" ? "Loading..." : "Sign In"}
              </Button>

              <Button
                onClick={() => handleClick("/sign-up", "sign-up")}
                disabled={loadingButton === "sign-up"}
                className="flex items-center gap-2"
              >
                {loadingButton === "sign-up" && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {loadingButton === "sign-up" ? "Loading..." : "Sign Up"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
