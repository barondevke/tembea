"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Cookies } from "react-cookie";

import {
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  Store,
  CreditCard,
  LogOut,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/toaster";
import { RootState, AppDispatch } from "@/redux/store";
import api from "@/api";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlicer";
import { UserType } from "@/types/types";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Sellers", href: "/admin/sellers", icon: Store },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const cookie = new Cookies();
    const dispatch = useDispatch<AppDispatch>();
  const user: UserType = useSelector((state: RootState) => state.user);


  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!user || !user.role) return;

    if (user.role !== "admin" && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [user, pathname, router]);

  const signOut = async () => {
    try {
      await api.post("/api/user/sign-out"); // Optional: tell backend to clear session
      cookie.remove("user_id");
      dispatch(setUser({} as UserType));
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (pathname !== "/admin/login" && loading) {
    return null; // Or a spinner like <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar user={user} pathname={pathname} onLogout={signOut} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar user={user} pathname={pathname} onLogout={signOut} />
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({
  user,
  pathname,
  onLogout,
}: {
  user: { name: string };
  pathname: string;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Tembea Admin</h2>
        <p className="text-sm text-muted-foreground">{user.name}</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminLayoutContent>{children}</AdminLayoutContent>
      <Toaster />
    </>
  );
}
