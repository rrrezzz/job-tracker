export const STATUS_OPTIONS = ["Applied", "Interviewing", "Offer", "Rejected"];
export const PLATFORM_OPTIONS = ["LinkedIn", "Referral", "Company Site", "AngelList", "Indeed", "Other"];
export const LOCATION_OPTIONS = ["Remote", "Onsite", "Hybrid"];

export const SORT_OPTIONS = [
  { value: "date", label: "Applied Date" },
  { value: "salary", label: "Salary" },
  { value: "company", label: "Company" },
];

export const STATUS_COLORS = {
  Applied: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  Interviewing: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  Offer: "bg-green-500/15 text-green-400 border border-green-500/30",
  Rejected: "bg-red-500/15 text-red-400 border border-red-500/30",
};

export const STATUS_DOT = {
  Applied: "bg-blue-400",
  Interviewing: "bg-yellow-400",
  Offer: "bg-green-400",
  Rejected: "bg-red-400",
};

export function formatSalary(n) {
  if (!n) return "—";
  return "$" + Number(n).toLocaleString();
}

export function getLogoUrl(company) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(company || "NA")}&background=22c55e&color=fff&size=128&bold=true`;
}
