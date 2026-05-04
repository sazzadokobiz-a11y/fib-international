"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div
            className="h-32 flex items-center justify-center text-white text-center p-6"
            style={{ backgroundColor: "#5D4037" }}
          >
            <div>
              <h1 className="text-3xl font-bold font-heading">FIB International</h1>
              <p className="text-sm mt-2 opacity-90">Admin Dashboard</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm mb-8">Sign in to access your admin panel</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 transition-colors outline-none ${
                      errors.email
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : "border-gray-200 bg-gray-50 focus:border-[#5D4037] focus:bg-white"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                    <span>•</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••"
                    className={`w-full pl-10 pr-12 py-2 rounded-lg border-2 transition-colors outline-none ${
                      errors.password
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : "border-gray-200 bg-gray-50 focus:border-[#5D4037] focus:bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                    <span>•</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("rememberMe")}
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 accent-[#5D4037]"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link href="#" className="text-sm font-medium text-[#5D4037] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ backgroundColor: "#5D4037" }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-8 py-4 text-center text-sm text-gray-600">
            Demo credentials • No real data collected
          </div>
        </div>
      </div>
    </div>
  );
}

