import { AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/ApplicationContext";
import JobCard from "../components/jobCard";

export default function Bookmarks() {
  const { applications } = useAppContext();
  const bookmarked = applications.filter((a) => a.bookmarked);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Bookmarks</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {bookmarked.length} saved application{bookmarked.length !== 1 ? "s" : ""}
        </p>
      </div>

      {bookmarked.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🔖</p>
          <p className="font-semibold text-white">No bookmarks yet</p>
          <p className="text-sm text-zinc-500 mt-1">
            Hover over any job card and click the bookmark icon to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AnimatePresence>
            {bookmarked.map((app) => (
              <JobCard key={app.id} app={app} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}