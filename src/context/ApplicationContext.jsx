import { createContext, useContext, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage"; // Import your hook!

const ApplicationContext = createContext(null);

const SAMPLE_DATA = [
  // ... your sample data
];

export function ApplicationProvider({ children }) {
  // 🎯 USE YOUR CUSTOM HOOK instead of manual useState + useEffect
  const [applications, setApplications, removeApplications] = useLocalStorage(
    "job_tracker", 
    SAMPLE_DATA
  );

  // CRUD Operations with callbacks for stability
  const addApplication = useCallback((data) => {
    const newApp = { 
      ...data, 
      id: crypto.randomUUID(), 
      bookmarked: false 
    };
    setApplications((prev) => [newApp, ...prev]);
    toast.success(`Added ${data.company}!`);
  }, [setApplications]);

  const updateApplication = useCallback((id, data) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...data } : app))
    );
    toast.success("Application updated!");
  }, [setApplications]);

  const deleteApplication = useCallback((id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    toast.error("Application removed.");
  }, [setApplications]);

  const toggleBookmark = useCallback((id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
  }, [setApplications]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    toggleBookmark,
    // Expose reset for debugging
    resetData: () => removeApplications(),
  }), [
    applications, 
    addApplication, 
    updateApplication, 
    deleteApplication, 
    toggleBookmark,
    removeApplications
  ]);

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useAppContext must be used within ApplicationProvider");
  }
  return context;
}