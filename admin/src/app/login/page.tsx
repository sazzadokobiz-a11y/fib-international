import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div
            className="h-32 flex items-center justify-center text-white text-center p-6"
            style={{ backgroundColor: "#5D4037" }}
          >
            <div>
              <h1 className="text-3xl font-bold font-heading">
                FIB International
              </h1>
              <p className="text-sm mt-2 opacity-90">Admin Dashboard</p>
            </div>
          </div>

          {/* Form */}
          <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center"><Spinner className="size-8" /></div>}>
            <LoginForm/>
          </Suspense>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 px-8 py-4 text-center text-sm text-gray-600">
            Demo credentials • No real data collected
          </div>
        </div>
      </div>
    </div>
  );
}