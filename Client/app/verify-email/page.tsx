"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/userSlicer";
import { UserType, VerificationType } from "@/types/types";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cookie = new Cookies();

  const router = useRouter();
  const { toast } = useToast();

  const verification: VerificationType = useSelector(
    (state: RootState) => state.verification
  );

  // Get email from URL query params

  // Handle input change for verification code
  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle key down for backspace navigation
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle paste functionality
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newCode = [...verificationCode];

    digits.forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });

    setVerificationCode(newCode);

    // Focus the next empty input or the last input
    const lastFilledIndex = Math.min(digits.length - 1, 5);
    const nextEmptyIndex = newCode.findIndex(
      (digit, index) => !digit && index > lastFilledIndex
    );

    const inputToFocus = document.getElementById(
      `code-${nextEmptyIndex > -1 ? nextEmptyIndex : 5}`
    );
    if (inputToFocus) inputToFocus.focus();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const code = verificationCode.join("");

    if (code.length !== 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsVerifying(true);

    try {
      // In a real application, you would make an API call to verify the code
      // For this demo, we'll simulate a verification process

      const res = await axios.get(
        `http://localhost:4000/api/user/verify-code/${verification.id}/${parseInt(code)}`
      );

      console.log(res.data)
      // For demo purposes, let's consider "123456" as the valid code
      if (res.data.proceed) {
        setSuccess(true);
        toast({
          title: "Email verified successfully",
          description: "Your account has been activated.",
        });

        const createUserRes = await axios.post(`http://localhost:4000/api/user/create-user`, {
          verification,
        });

        const data: UserType = {
          email: createUserRes.data.data.email,
          name: createUserRes.data.data.name,
          id: createUserRes.data.data.id,
          profile_image: createUserRes.data.data.profile_image,
          enabled: true,
          date_created: new Date(),
        };
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        cookie.set("user_id", data.id, {
          expires: expirationDate,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // ✅ Store Token separately
        cookie.set("token", createUserRes.data.token, {
          expires: expirationDate,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        dispatch(setUser(data));

        alert("Login Successful");
        router.push("/");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during verification. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {

    toast({
      title: "Verification code resent",
      description: `A new code has been sent to ${verification.email}`,
    });
  };

  return (
    <div className="container flex items-center justify-center py-20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            {verification ? (
              <>
                We've sent a verification code to{" "}
                <span className="font-medium">{verification.email}</span>
              </>
            ) : (
              "Enter the verification code sent to your email"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center">
                Email Verified!
              </h3>
              <p className="text-center text-muted-foreground">
                Your email has been successfully verified. Redirecting you to
                the home page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="grid grid-cols-6 gap-2">
                    {verificationCode.map((digit, index) => (
                      <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-10 h-12 text-center text-lg font-semibold"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
          )}
        </CardContent>
        {!success && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Didn't receive a code?{" "}
              <button
                onClick={handleResendCode}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Resend Code
              </button>
            </div>
            <div className="text-center text-sm">
              <Link
                href="/sign-in"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Back to Sign In
              </Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}