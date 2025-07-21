"use client";
import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  Video,
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome,
  Apple,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/queries/auth.queries";

export interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const LoginQuery = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    LoginQuery.mutate({
      email: data.email,
      password: data.password,
    });
    // e.preventDefault();
    // setIsLoading(true);
    // // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // setIsLoading(false);
    // console.log("Login attempt:", { email, password, rememberMe });
  };

  useEffect(() => {
    if (LoginQuery.isSuccess) {
      console.log("Login successful", LoginQuery.data);
      router.push("/dashboard");
    } else if (LoginQuery.isError) {
      console.error("Login failed", LoginQuery.error);
    }
  }, [
    LoginQuery.isSuccess,
    LoginQuery.isError,
    LoginQuery.data,
    LoginQuery.error,
    router,
  ]);

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-chart-3/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-chart-2 rounded-2xl flex items-center justify-center shadow-2xl">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your StreamNest account
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
              <Badge
                variant="outline"
                className="text-xs border-primary/20 bg-primary/5"
              >
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
            </div>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email/Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="enter your email"
                    {...register("email")}
                    // onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-2 focus:border-primary/50 transition-all duration-300"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password"
                    {...register("password")}
                    // onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2 focus:border-primary/50 transition-all duration-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="border-2"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="text-sm text-primary hover:text-primary/80 p-0 h-auto"
                >
                  Forgot password?
                </Button>
              </div> */}

              {/* Submit Button */}
              <Button
                type="submit"
                // onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Security info */}
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>
                  Your login is secured with industry-standard encryption
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign up link */}
        <div className="text-center mt-6 ">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="text-primary hover:text-primary/80 p-0 h-auto font-semibold cursor-pointer"
              onClick={() => router.push("/auth/signup")}
            >
              Sign up for free
            </Button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 StreamNest. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
