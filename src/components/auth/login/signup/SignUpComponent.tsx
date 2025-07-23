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
  User,
  Sparkles,
  Shield,
  Zap,
  Check,
  X,
  Upload,
  Camera,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signupSchema";
import { useSignUp } from "@/queries/auth.queries";
import { toast } from "sonner";

export default function SignUpComponent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const SubmitQuery = useSignUp();

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    accountType: "viewer",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const watchFirstName = watch("firstname");
  const watchLastName = watch("lastname");
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchUsername = watch("username");

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setPasswordChecks(checks);
    const strength = Object.values(checks).filter(Boolean).length;
    setPasswordStrength((strength / 5) * 100);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSocialSignUp = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  const onSubmit = async (data) => {
    SubmitQuery.mutate({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      role: "Consumer", //setting role to Consumer by default
    });
    setIsLoading(true);
    console.log("Sign up data:", formData);
  };

  useEffect(() => {
    if (SubmitQuery.isSuccess) {
      setIsLoading(false);
      toast.success("Sign up successful! Welcome on Board🎉");
      router.push("/auth/login");
    }
  }, [SubmitQuery.isSuccess]);

  useEffect(() => {
    if (SubmitQuery.isPending) {
      setIsLoading(true);
      toast.info("Creating your account...");
    }
  }, [SubmitQuery.isPending]);

  useEffect(() => {
    if (SubmitQuery.isError) {
      setIsLoading(false);
      toast.error("Sign up failed. Please try again.");
      console.error("Sign up error:", SubmitQuery.error);
    }
  }, [SubmitQuery.isError, SubmitQuery.error]);

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceedStep1 = watchFirstName && watchLastName && watchEmail;
  const canProceedStep2 = watchUsername && watchPassword;
  // formData.password === formData.confirmPassword &&
  // passwordStrength >= 60;
  //   const canSubmit = formData.username && formData.agreeToTerms;

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
            Join StreamNest
          </h1>
          <p className="text-muted-foreground">
            Create your account and start your creative journey
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of 2
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / 2) * 100)}%
            </span>
          </div>
          <Progress value={(currentStep / 2) * 100} className="h-2" />
        </div>

        {/* Sign Up Card */}
        <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold">
                {currentStep === 1 && "Personal Info"}
                {currentStep === 2 && "Account Security"}
                {/* {currentStep === 3 && "Complete Setup"} */}
              </CardTitle>
              <Badge
                variant="outline"
                className="text-xs border-primary/20 bg-primary/5"
              >
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
            </div>
            <CardDescription>
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Create a secure password"}
              {/* {currentStep === 3 && "Finalize your account"} */}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormProvider
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
                  {/* Name fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          {...register("firstname")}
                          className="pl-10 h-12 border-2 focus:border-primary/50 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          {...register("lastname")}
                          className="pl-10 h-12 border-2 focus:border-primary/50 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        className="pl-10 h-12 border-2 focus:border-primary/50 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedStep1}
                    className="w-full h-12 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </>
              )}

              {/* Step 2: Password & Security */}
              {currentStep === 2 && (
                <>
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                        @
                      </span>
                      <Input
                        id="username"
                        type="text"
                        placeholder="your-username"
                        {...register("username")}
                        className="pl-8 h-12 border-2 focus:border-primary/50 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        {...register("password")}
                        className="pl-10 pr-10 h-12 border-2 focus:border-primary/50 transition-all duration-300"
                        required
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

                    {/* Password strength indicator */}
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Password strength
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {passwordStrength < 40 && "Weak"}
                            {passwordStrength >= 40 &&
                              passwordStrength < 80 &&
                              "Good"}
                            {passwordStrength >= 80 && "Strong"}
                          </span>
                        </div>
                        <Progress value={passwordStrength} className="h-2" />

                        {/* Password requirements */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div
                            className={`flex items-center ${
                              passwordChecks.length
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {passwordChecks.length ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <X className="w-3 h-3 mr-1" />
                            )}
                            8+ characters
                          </div>
                          <div
                            className={`flex items-center ${
                              passwordChecks.uppercase
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {passwordChecks.uppercase ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <X className="w-3 h-3 mr-1" />
                            )}
                            Uppercase
                          </div>
                          <div
                            className={`flex items-center ${
                              passwordChecks.lowercase
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {passwordChecks.lowercase ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <X className="w-3 h-3 mr-1" />
                            )}
                            Lowercase
                          </div>
                          <div
                            className={`flex items-center ${
                              passwordChecks.number
                                ? "text-green-600"
                                : "text-muted-foreground"
                            }`}
                          >
                            {passwordChecks.number ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <X className="w-3 h-3 mr-1" />
                            )}
                            Number
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1 h-12 border-2"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit(onSubmit)}
                      disabled={isLoading || !canProceedStep2}
                      className="flex-1 h-12 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Create Account
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </div>
                </>
              )}

              {/* Step 3: Final Setup */}
              {/* {currentStep === 3 && (
              <>
                
                <div className="space-y-4">
                  <Label className="text-sm font-medium">
                    Profile Picture (Optional)
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 border-4 border-primary/20">
                      <AvatarImage src={avatarPreview} alt="Profile" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-white text-lg">
                        {formData.firstName?.[0]}
                        {formData.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full h-12 border-2 hover:bg-accent/5 transition-all duration-300 group"
                        // onClick={() => document.getElementById('avatar-upload').click()}
                      >
                        <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Upload Photo
                      </Button>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                
                <div className="space-y-3">
                  <Label className="text-sm font-medium">I want to...</Label>
                  <RadioGroup
                    value={formData.accountType}
                    onValueChange={(value) =>
                      handleInputChange("accountType", value)
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="viewer" id="viewer" />
                      <Label
                        htmlFor="viewer"
                        className="text-sm cursor-pointer"
                      >
                        Watch videos
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="creator" id="creator" />
                      <Label
                        htmlFor="creator"
                        className="text-sm cursor-pointer"
                      >
                        Create content
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

               
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", checked)
                      }
                      className="border-2"
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      I agree to the{" "}
                      <Button
                        variant="link"
                        className="text-primary hover:text-primary/80 p-0 h-auto text-sm"
                      >
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button
                        variant="link"
                        className="text-primary hover:text-primary/80 p-0 h-auto text-sm"
                      >
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) =>
                        handleInputChange("subscribeNewsletter", checked)
                      }
                      className="border-2"
                    />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm cursor-pointer"
                    >
                      Send me product updates and newsletter
                    </Label>
                  </div>
                </div>

                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 h-12 border-2"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit || isLoading}
                    className="flex-1 h-12 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                        Creating...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Create Account
                        <Sparkles className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                  </Button>
                </div>
              </>
            )} */}
            </FormProvider>
            {/* Security info */}
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>
                  Your data is protected with enterprise-grade security
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign in link */}
        <div className="text-center mt-6">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Button
              variant="link"
              className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
              onClick={() => router.push("/auth/login")}
            >
              Sign in
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
            © 2025 StreamNest. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
