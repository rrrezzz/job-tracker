import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiBookmarkLine, RiBookmarkFill, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useAppContext } from "../context/ApplicationContext";
import { STATUS_COLORS, formatSalary, getLogoUrl } from "../utils/helpers";
import { format } from "date-fns";

export default function JobCard({ app }) {
  const { deleteApplication, toggleBookmark } = useAppContext();
  const navigate = useNavigate();
  const [imgErr, setImgErr] = useState(false);
  const initials = app.company?.slice(0, 2).toUpperCase() || "NA";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="bg-zinc-900 border border-white/5 rounded-xl p-4 flex items-start gap-4 group hover:border-white/10 transition-all duration-200"
    >
      {/* Logo */}
      <div className="w-11 h-11 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/5">
        {!imgErr ? (
          <img
            src={getLogoUrl(app.company)}
            alt={app.company}
            className="w-8 h-8 object-contain"
            onError={() => setImgErr(true)}
          />
        ) : (
          <span className="text-xs font-bold text-zinc-400">{initials}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-white text-sm">{app.company}</h3>
            <p className="text-zinc-400 text-xs mt-0.5">{app.role}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium ${STATUS_COLORS[app.status]}`}>
            {app.status}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-zinc-500">{app.location}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-xs text-zinc-500">{app.platform}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-xs text-green-400 font-medium">{formatSalary(app.salary)}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-zinc-600">
            {app.appliedDate ? format(new Date(app.appliedDate), "MMM d, yyyy") : "—"}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => toggleBookmark(app.id)}
              className="p-1.5 rounded-md hover:bg-white/5 text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              {app.bookmarked ? <RiBookmarkFill className="text-yellow-400" /> : <RiBookmarkLine />}
            </button>
            <button
              onClick={() => navigate(`/applications/${app.id}`)}
              className="p-1.5 rounded-md hover:bg-white/5 text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <RiEditLine />
            </button>
            <button
              onClick={() => deleteApplication(app.id)}
              className="p-1.5 rounded-md hover:bg-white/5 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}