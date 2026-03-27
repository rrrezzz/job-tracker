import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { useAppContext } from "../context/ApplicationContext";
import { format } from "date-fns";

const PIE_COLORS = ["#3b82f6", "#eab308", "#22c55e", "#ef4444"];
const STATUS_LIST = ["Applied", "Interviewing", "Offer", "Rejected"];

export function StatusPieChart() {
  const { applications } = useAppContext();

  const data = STATUS_LIST.map((s, i) => ({
    name: s,
    value: applications.filter((a) => a.status === s).length,
    color: PIE_COLORS[i],
  })).filter((d) => d.value > 0);

  return (
    <div className="bg-zinc-900 border border-white/5 rounded-xl p-5">
      <h3 className="font-semibold text-white mb-4">Pipeline Breakdown</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#a1a1aa" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
            {d.name} ({d.value})
          </div>
        ))}
      </div>
    </div>
  );
}

export function MonthlyBarChart() {
  const { applications } = useAppContext();

  const counts = {};
  applications.forEach((a) => {
    if (!a.appliedDate) return;
    const month = format(new Date(a.appliedDate), "MMM");
    counts[month] = (counts[month] || 0) + 1;
  });

  const data = Object.entries(counts).map(([month, count]) => ({ month, count }));

  return (
    <div className="bg-zinc-900 border border-white/5 rounded-xl p-5">
      <h3 className="font-semibold text-white mb-4">Monthly Applications</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#22c55e" }}
          />
          <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}