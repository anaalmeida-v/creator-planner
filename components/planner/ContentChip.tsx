"use client";

import { FormatBadge } from "@/components/ui/FormatBadge";
import type { ContentItem } from "@/lib/types";

export function ContentChip({
  item,
  active,
  onClick,
  compact = false,
}: {
  item: ContentItem;
  active?: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-2.5 py-2 text-left transition ${
        active ? "border-coffee/40 bg-badge-long" : "border-transparent bg-badge-long/80 hover:border-line"
      }`}
    >
      <FormatBadge format={item.format} />
      <p className={`mt-1.5 leading-snug text-ink ${compact ? "line-clamp-2 text-[11px]" : "line-clamp-3 text-[12px]"}`}>
        {item.coverText || item.idea}
      </p>
    </button>
  );
}
