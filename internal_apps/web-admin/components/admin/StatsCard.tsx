"use client";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    color?: 'blue' | 'green' | 'orange' | 'purple';
}

export default function StatsCard({ title, value, icon, trend, color = 'blue' }: StatsCardProps) {
    const colorConfigs = {
        blue: { bg: 'bg-blue-500', text: 'text-blue-500' },
        green: { bg: 'bg-green-500', text: 'text-green-500' },
        orange: { bg: 'bg-orange-500', text: 'text-orange-500' },
        purple: { bg: 'bg-purple-500', text: 'text-purple-500' },
    };

    const config = colorConfigs[color];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-500 text-sm mb-2">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                    {trend && (
                        <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {trend.value}
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center`}>
                    <i className={`fi ${icon} text-2xl text-white`}></i>
                </div>
            </div>
        </div>
    );
}
