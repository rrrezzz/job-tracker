import { RiSearchLine, RiCloseLine } from "react-icons/ri";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search company or role..."
        className="w-full bg-zinc-800 border border-white/5 rounded-lg pl-9 pr-9 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-green-500/40 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
        >
          <RiCloseLine />
        </button>
      )}
    </div>
  );
}