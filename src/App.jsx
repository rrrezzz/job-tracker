import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApplicationProvider } from "./context/ApplicationContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import Analytics from "./pages/Analytics";
import Bookmarks from "./pages/Bookmarks";

export default function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-zinc-950">

          {/* Sidebar */}
          <Navbar />

          {/* Main content */}
          <main className="ml-56 flex-1 p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<AddApplication />} />
              <Route path="/applications/:id" element={<AddApplication />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </main>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          theme="dark"
        />
      </BrowserRouter>
    </ApplicationProvider>
  );
}