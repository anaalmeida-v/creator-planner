"use client";

import { FormatBadge } from "@/components/ui/FormatBadge";
import { StatusDot } from "@/components/ui/StatusDot";
import { useFilteredItems, useStore } from "@/lib/store";
import { formatListDate, formatTime } from "@/lib/utils";

export function AgendaList({ title = "sua agenda" }: { title?: string }) {
  const items = useFilteredItems();
  const { selectedId, select } = useStore();

  return (
    <section>
      <h3 className="mb-3 text-[13px] lowercase text-ink-muted">{title}</h3>
      <div className="space-y-2">
        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line px-4 py-8 text-center text-[13px] text-ink-muted">
            nenhuma ideia neste filtro ainda.
          </p>
        )}
        {items.map((item) => {
          const active = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => select(item.id)}
              className={`flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                active ? "border-coffee/30 bg-badge-long" : "border-line bg-white hover:bg-cream-muted/70"
              }`}
            >
              <div className="w-12 shrink-0 pt-0.5">
                <p className="text-[13px] lowercase leading-tight">{formatListDate(item.publishAt)}</p>
                <p className="text-[11px] text-ink-muted">{formatTime(item.publishAt)}</p>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <FormatBadge format={item.format} />
                  <StatusDot status={item.status} />
                </div>
                <p className="mt-1.5 text-[14px] leading-snug">{item.coverText}</p>
                <p className="mt-0.5 line-clamp-2 text-[12px] text-ink-muted">{item.idea}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
