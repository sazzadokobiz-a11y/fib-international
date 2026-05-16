import { Mail, MailOpen, MessageCircleReply } from "lucide-react";

export default function ContactStats() {
    const stats = [
        {
            title: "Total Messages",
            value: 120,
            icon: Mail,
        },
        {
            title: "Pending",
            value: 18,
            icon: MailOpen,
        },
        {
            title: "Replied",
            value: 4,
            icon: MessageCircleReply,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {stat.title}
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {stat.value}
                                </h2>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-[#5D4037]/10 flex items-center justify-center">
                                <Icon className="text-[#5D4037]" />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}