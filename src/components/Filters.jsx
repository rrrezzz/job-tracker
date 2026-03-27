import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS, SORT_OPTIONS } from "../utils/helpers";

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-green-500/40 transition-colors cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value}>
          {typeof o === "string" ? o : o.label}
        </option>
      ))}
    </select>
  );
}

export default function Filters({ filters, onChange }) {
  const set = (key) => (val) => onChange({ ...filters, [key]: val });

  return (
    <div className="flex flex-wrap gap-2">
      <Select value={filters.status} onChange={set("status")} options={STATUS_OPTIONS} placeholder="All Status" />
      <Select value={filters.platform} onChange={set("platform")} options={PLATFORM_OPTIONS} placeholder="All Platforms" />
      <Select value={filters.location} onChange={set("location")} options={LOCATION_OPTIONS} placeholder="All Locations" />
      <Select value={filters.sort} onChange={set("sort")} options={SORT_OPTIONS} placeholder="Sort By" />
    </div>
  );
}