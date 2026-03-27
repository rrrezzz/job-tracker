import { useMemo } from "react";
import { useAppContext } from "../context/ApplicationContext";
import { useDebounce } from "./useDebounce";

export function useApplications({ search = "", status = "", platform = "", location = "", sort = "" }) {
  const { applications } = useAppContext();
  const debouncedSearch = useDebounce(search, 400);

  const filtered = useMemo(() => {
    let result = [...applications];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (a) =>
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q)
      );
    }

    if (status) result = result.filter((a) => a.status === status);
    if (platform) result = result.filter((a) => a.platform === platform);
    if (location) result = result.filter((a) => a.location === location);

    if (sort === "date") result.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    if (sort === "salary") result.sort((a, b) => b.salary - a.salary);
    if (sort === "company") result.sort((a, b) => a.company.localeCompare(b.company));

    return result;
  }, [applications, debouncedSearch, status, platform, location, sort]);

  return filtered;
}