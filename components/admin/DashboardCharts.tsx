"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

type TrendPoint = { month: string; members: number };
type StatusPoint = { name: string; value: number; color: string };
type ContentPoint = { name: string; value: number; fill: string };
type CategoryPoint = { name: string; value: number };

const tooltipStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: 12,
  color: "#f8fafc",
  fontSize: 12,
};

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E6E8F0] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="h-64 w-full">{children}</div>
    </div>
  );
}

export default function DashboardCharts({
  memberTrend,
  memberStatus,
  contentOverview,
  membershipCategories,
}: {
  memberTrend: TrendPoint[];
  memberStatus: StatusPoint[];
  contentOverview: ContentPoint[];
  membershipCategories: CategoryPoint[];
}) {
  const statusTotal = memberStatus.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-extrabold text-[#1E0D79]">Analytics</h3>
        <p className="mt-0.5 text-sm text-slate-500">
          Live overview of membership and content performance
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Member growth */}
        <div className="xl:col-span-2">
          <ChartCard
            title="Member Registrations"
            subtitle="Applications received over the last 6 months"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memberTrend} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="memberFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E0D79" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#1E0D79" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="members"
                  name="Members"
                  stroke="#1E0D79"
                  strokeWidth={2.5}
                  fill="url(#memberFill)"
                  activeDot={{ r: 5, fill: "#D92936" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Status donut */}
        <ChartCard
          title="Membership Status"
          subtitle={`${statusTotal} total applications`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={memberStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="48%"
                innerRadius={58}
                outerRadius={84}
                paddingAngle={3}
                stroke="none"
              >
                {memberStatus.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-xs text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Content overview */}
        <ChartCard
          title="Content Overview"
          subtitle="Site content counts across sections"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contentOverview} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f1f5f9" }} />
              <Bar dataKey="value" name="Count" radius={[10, 10, 4, 4]} maxBarSize={42}>
                {contentOverview.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Membership categories */}
        <ChartCard
          title="Membership Categories"
          subtitle="Breakdown by selected membership type"
        >
          {membershipCategories.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No membership category data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={membershipCategories}
                margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tick={{ fill: "#475569", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f1f5f9" }} />
                <Bar
                  dataKey="value"
                  name="Members"
                  fill="#D92936"
                  radius={[0, 10, 10, 0]}
                  maxBarSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
