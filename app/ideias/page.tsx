"use client";

import { Lightbulb } from "lucide-react";
import { DetailsPanel } from "@/components/details/DetailsPanel";
import { QuickAdd } from "@/components/planner/QuickAdd";
import { FormatBadge } from "@/components/ui/FormatBadge";
import { StatusDot } from "@/components/ui/StatusDot";
import { useFilteredItems, useStore } from "@/lib/store";
import { formatListDate } from "@/lib/utils";

export default function IdeiasPage() {
  const items = useFilteredItems();
  const { selected, select, setFilters, filters } = useStore();

  return (
    <div className="flex min-h-0 flex-1">
      <div className="min-w-0 flex-1 overflow-y-auto px-4 py-6 pb-28 lg:px-8 lg:pb-8">
        <div className="mb-6">
          <h1 className="text-[26px] font-medium lowercase">banco de ideias</h1>
          <p className="mt-1 text-[13px] text-ink-muted">tudo que ainda é semente, rascunho ou já virou pauta.</p>
        </div>

        <div className="mb-6">
          <QuickAdd />
        </div>

        <div className="mb-4 flex gap-2">
          {(["todos", "ideia", "roteiro", "pronto", "publicado"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilters({ status: status === "todos" ? "todos" : status })}
              className={`rounded-full border px-3 py-1.5 text-[12px] lowercase ${
                filters.status === status || (status === "todos" && filters.status === "todos")
                  ? "border-coffee/30 bg-badge-long text-coffee-dark"
                  : "border-line bg-white text-ink-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => select(item.id)}
              className="rounded-3xl border border-line bg-white p-4 text-left shadow-card transition hover:border-coffee/20"
            >
              <div className="flex items-center justify-between gap-2">
                <FormatBadge format={item.format} />
                <span className="text-[11px] text-ink-muted">{formatListDate(item.publishAt)}</span>
              </div>
              <p className="mt-3 text-[16px] lowercase leading-snug">{item.coverText}</p>
              <p className="mt-2 line-clamp-3 text-[13px] text-ink-muted">{item.idea}</p>
              <div className="mt-4 flex items-center gap-2 text-ink-muted">
                <Lightbulb size={14} />
                <StatusDot status={item.status} />
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <DetailsPanel />}
    </div>
  );
}
