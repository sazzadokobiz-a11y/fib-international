'use client'

import { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";

type ToastType = "success" | "error" | "info";

type ToastState = {
    message: string;
    type: ToastType;
} | null;

type ToastContextValue = {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastClassName: Record<ToastType, string> = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-primary text-white"
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<ToastState>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        setToast({ message, type });

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setToast(null);
        }, 3500);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`fixed right-4 top-4 z-50 max-w-sm rounded-lg px-4 py-3 text-sm font-medium shadow-xl ${toastClassName[toast.type]}`}>
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}
