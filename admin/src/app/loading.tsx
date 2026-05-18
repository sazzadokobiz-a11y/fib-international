import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return (
        <div className="w-full min-h-svh flex items-center justify-center">
            <Spinner className="md:size-10 size-6" />
        </div>
    );
}