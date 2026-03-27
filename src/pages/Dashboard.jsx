import { useAppContext } from "../context/ApplicationContext";
import StatCard from "../components/StatCard";
import { StatusPieChart, MonthlyBarChart } from "../components/Charts";
import JobCard from "../components/jobCard";
import { AnimatePresence } from "framer-motion";
import { RiBriefcaseLine, RiCalendarCheckLine, RiTrophyLine, RiCloseLine } from "react-icons/ri";

export default function Dashboard() {
  const { applications } = useAppContext();

  const stats = {
    total: applications.length,
    interviewing: applications.filter((a) => a.status === "Interviewing").length,
    offers: applications.filter((a) => a.status === "Offer").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  const recent = applications.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Overview of your job search</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Applied" value={stats.total} icon={<RiBriefcaseLine />} accent="green" />
        <StatCard label="Interviewing" value={stats.interviewing} icon={<RiCalendarCheckLine />} accent="yellow" />
        <StatCard label="Offers" value={stats.offers} icon={<RiTrophyLine />} accent="green" />
        <StatCard label="Rejected" value={stats.rejected} icon={<RiCloseLine />} accent="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusPieChart />
        <MonthlyBarChart />
      </div>

      {/* Recent Applications */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          Recent Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence>
            {recent.map((app) => (
              <JobCard key={app.id} app={app} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}