"use client";

import { useState, FormEvent } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { loginAdmin } from "@/services/admin";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);




    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Please wait...")

        const form = e.currentTarget

        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await loginAdmin({ email, password });
            if (result.success) {
                toast.success("Login successfull", { id: toastId })
                const redirectTo = searchParams.get("redirect") || "/";
                router.push(redirectTo);
            }
        } catch (error) {
            console.log(error);
            const err = error as unknown as Error;
            toast.error(err.message, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
            </h2>

            <p className="text-gray-500 text-sm mb-8">
                Sign in to access your admin panel
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                    </label>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Mail size={18} className="text-gray-400" />
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-[#5D4037] focus:bg-white outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Lock size={18} className="text-gray-400" />
                        </div>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="••••••"
                            required
                            className="w-full pl-10 pr-12 py-2 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-[#5D4037] focus:bg-white outline-none transition-colors"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                </div>


                {/* Submit */}
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
    );
}