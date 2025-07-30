"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setVerificationData } from "@/redux/verificationSlice";
import { type VerificationType } from "@/types/types";
import api from "@/api";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Please enter a valid email.");
  };

  const validatePassword = (value: string) => {
    setPasswordError(
      value.length >= 6 ? "" : "Password must be at least 6 characters."
    );
  };

  const removeTrailingWhitespace = (str: string): string => {
    let i = str.length - 1;
    while (i >= 0 && str.charAt(i) === " ") {
      i--;
    }
    return str.slice(0, i + 1);
  };

  const defaultSignUp = async (): Promise<void> => {
    const cleanedData: VerificationType = {
      name: removeTrailingWhitespace(name),
      email: removeTrailingWhitespace(email),
      password: removeTrailingWhitespace(password),
      id: null,
      date_created: null,
    };

    try {
      const response = await api.post("/api/user/verify", cleanedData);
      const res = response.data;

      if (res.proceed) {
        cleanedData.id = res.verificationID;
        dispatch(setVerificationData(cleanedData));
        router.push("/verify-email");
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      throw new Error(error?.message || "An error occurred during sign up.");
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    validateEmail(email);
    validatePassword(password);
    console.log(emailError || passwordError || !agreedToTerms)

    if (emailError || passwordError || !agreedToTerms) {
      toast({
        title: "Please fix the errors",
        description: "Make sure all fields are valid and terms are agreed to.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await defaultSignUp();
     
      router.push("/verify-email");
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Sign up failed",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn();
      toast({
        title: "Account created",
        description:
          "Welcome to Tembezi! Your account has been created successfully.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Google sign up failed",
        description: "An error occurred during sign up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-20">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-muted-foreground">
            Sign up to start exploring amazing destinations
          </p>
        </div>

        <div className="space-y-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            {/* Google SVG icon here */}
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                required
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
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
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked as boolean)
                }
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-purple-600 underline hover:text-purple-700"
                >
                  terms and conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-purple-600 underline hover:text-purple-700"
                >
                  privacy policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-purple-600 hover:text-purple-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}