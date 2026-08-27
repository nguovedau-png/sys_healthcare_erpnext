import React from 'react';

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

interface PageLayoutProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  actions?: React.ReactNode;
  stats?: StatCard[];
  children: React.ReactNode;
}

export function StatBadge({ label, value, icon, color, trend }: StatCard) {
  return (
    <div className={`flex flex-col gap-1 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-gray-900 leading-tight">{value}</p>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: React.ReactNode; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center bg-white rounded-2xl border border-dashed border-gray-200">
      <div className="text-5xl mb-4 opacity-40">{icon}</div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-400 max-w-xs mb-6">{description}</p>
      {action}
    </div>
  );
}

export default function PageLayout({ title, subtitle, icon, iconBg, actions, stats, children }: PageLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${iconBg}`}>
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">{title}</h1>
            <p className="text-sm text-gray-500 font-medium mt-0.5">{subtitle}</p>
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {/* Stats Row */}
      {stats && stats.length > 0 && (
        <div className={`grid gap-4 grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)}`}>
          {stats.map((stat, i) => <StatBadge key={i} {...stat} />)}
        </div>
      )}

      {/* Main Content */}
      {children}
    </div>
  );
}
