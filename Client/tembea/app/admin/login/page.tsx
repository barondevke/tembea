"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlicer";
import { AppDispatch } from "@/redux/store";

import { useToast } from "@/components/ui/use-toast";

import axios from "axios";
import { Cookies } from "react-cookie";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const defaultSignIn = async () => {
    const payload = {
      email,
      password,
    };

    const response = await axios.post(
      "http://localhost:4000/api/user/sign-in",
      payload,
      {
        withCredentials: true, // ✅ this is the Axios equivalent of fetch's "credentials: 'include'"
      }
    );
    const res = response.data;
    if (!res.proceed) {
      throw new Error(res.message);
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    dispatch(setUser(res.user));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, you would validate credentials here
      await defaultSignIn();
      toast({
        title: "Sign in successful",
        description: "Welcome back to Tembea!",
      });
      router.push("/admin/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to access the Tembea admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tembea.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
