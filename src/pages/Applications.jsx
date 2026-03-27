import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { useApplications } from "../hooks/useApplications";

const TABS = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

export default function Applications() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    platform: "",
    location: "",
    sort: "",
  });

  const effectiveStatus = activeTab === "All" ? filters.status : activeTab;

  const apps = useApplications({
    search,
    status: effectiveStatus,
    platform: filters.platform,
    location: filters.location,
    sort: filters.sort,
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Applications</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {apps.length} application{apps.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900 border border-white/5 rounded-xl p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-green-500 text-white shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <Filters filters={filters} onChange={setFilters} />
      </div>

      {/* List */}
      {apps.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold text-white">No applications found</p>
          <p className="text-sm text-zinc-500 mt-1">
            Try adjusting your filters or add a new application.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence>
            {apps.map((app) => (
              <JobCard key={app.id} app={app} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}