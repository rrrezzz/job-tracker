import { useAppContext } from "../context/ApplicationContext";
import { StatusPieChart, MonthlyBarChart } from "../components/Charts";
import StatCard from "../components/StatCard";
import { RiBriefcaseLine, RiCalendarCheckLine, RiTrophyLine, RiBarChartLine } from "react-icons/ri";
import { formatSalary } from "../utils/helpers";

export default function Analytics() {
  const { applications } = useAppContext();

  const total = applications.length;
  const offers = applications.filter((a) => a.status === "Offer");
  const salaries = applications.filter((a) => a.salary > 0).map((a) => a.salary);
  const avgSalary = salaries.length
    ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
    : 0;
  const maxSalary = salaries.length ? Math.max(...salaries) : 0;
  const conversionRate = total ? Math.round((offers.length / total) * 100) : 0;

  const platformCounts = applications.reduce((acc, a) => {
    acc[a.platform] = (acc[a.platform] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-zinc-500 text-sm mt-1">Insights into your job search</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Applied" value={total} icon={<RiBriefcaseLine />} accent="green" />
        <StatCard label="Offers" value={offers.length} icon={<RiTrophyLine />} accent="green" />
        <StatCard label="Conversion" value={`${conversionRate}%`} icon={<RiCalendarCheckLine />} accent="yellow" />
        <StatCard label="Avg Salary" value={formatSalary(avgSalary)} icon={<RiBarChartLine />} accent="blue" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusPieChart />
        <MonthlyBarChart />
      </div>

      {/* Platform Breakdown */}
      <div className="bg-zinc-900 border border-white/5 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-4">Applications by Platform</h3>
        <div className="space-y-3">
          {Object.entries(platformCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([platform, count]) => (
              <div key={platform}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-300">{platform}</span>
                  <span className="text-zinc-500">{count}</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Salary Insights */}
      {salaries.length > 0 && (
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-5">
          <h3 className="font-semibold text-white mb-4">Salary Insights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Average</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{formatSalary(avgSalary)}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Highest</p>
              <p className="text-2xl font-bold text-white mt-1">{formatSalary(maxSalary)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
