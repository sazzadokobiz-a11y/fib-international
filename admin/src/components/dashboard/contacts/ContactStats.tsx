import { IStats } from "@/app/(DashboardLayout)/contact/page";
import { Mail, MailOpen, MessageCircleReply } from "lucide-react";

export default function ContactStats({ stats }: { stats: IStats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Total Message
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {stats.totalMessages}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[#5D4037]/10 flex items-center justify-center">
                        <Mail className="text-[#5D4037]" />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Replied Message
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {stats.replied}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[#5D4037]/10 flex items-center justify-center">
                        <MessageCircleReply className="text-[#5D4037]" />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Pending Message
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {stats.pending}
                        </h2>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-[#5D4037]/10 flex items-center justify-center">
                        <MailOpen className="text-[#5D4037]" />
                    </div>
                </div>
            </div>
        </div>
    );
}