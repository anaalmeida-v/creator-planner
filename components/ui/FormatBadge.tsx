import type { Format } from "@/lib/types";
import { formatLabel } from "@/lib/utils";

export function FormatBadge({ format }: { format: Format }) {
  const isShorts = format === "shorts";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${
        isShorts ? "bg-badge-shorts text-coffee-dark" : "bg-badge-long text-coffee-dark"
      }`}
    >
      {formatLabel(format)}
    </span>
  );
}
