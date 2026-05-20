import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/shared/ToastProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FIB International",
  description: "This website is created by okobiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main className="bg-[#fcf9f4]">
              {children}
              <Toaster position="top-right" richColors />
            </main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
