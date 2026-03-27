import { NavLink } from "react-router-dom";
import { RiDashboardLine, RiBriefcaseLine, RiBarChartLine, RiBookmarkLine } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";

const links = [
  { to: "/dashboard", icon: <RiDashboardLine />, label: "Dashboard" },
  { to: "/applications", icon: <RiBriefcaseLine />, label: "Applications" },
  { to: "/analytics", icon: <RiBarChartLine />, label: "Analytics" },
  { to: "/bookmarks", icon: <RiBookmarkLine />, label: "Bookmarks" },
];

export default function Navbar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-zinc-900 border-r border-white/5 flex flex-col z-50">
      
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <span className="font-bold text-xl text-white">
          job<span className="text-green-400">track</span>
        </span>
        <p className="text-xs text-zinc-500 mt-0.5">Your career pipeline</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <span className="text-lg">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Add Button */}
      <div className="px-4 py-4 border-t border-white/5">
        <NavLink
          to="/applications/new"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
        >
          <IoAddOutline className="text-lg" />
          Add Job
        </NavLink>
      </div>
    </aside>
  );
}