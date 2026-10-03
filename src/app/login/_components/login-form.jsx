'use client'
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ceredntialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(event.currentTarget);
      const response = await ceredntialLogin(formData);

      if (!!response.error) {
        console.log(response.error);
        setError(response.error);
        toast.error(response.error);
      } else {
        toast.success("Login successful");
        router.push("/courses");
      }
    } catch (e) {
      const errorMsg = e.message || "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }






  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">
          <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-3xl lg:leading-tight font-pj">
            <span className="relative inline-flex sm:inline">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative">Login</span>
            </span>
          </p></CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-0 h-full px-2.5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive text-center">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>
            {" "} or {" "}
            <Link href="/register/student" className="underline">
              Student
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}