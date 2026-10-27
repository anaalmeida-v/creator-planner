"use client";

import { CalendarDays, List } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Format, Status } from "@/lib/types";

const formats: Array<{ value: "todos" | Format; label: string }> = [
  { value: "todos", label: "todos os formatos" },
  { value: "video-longo", label: "vídeo longo" },
  { value: "shorts", label: "shorts" },
];

const statuses: Array<{ value: "todos" | Status; label: string }> = [
  { value: "todos", label: "todos os status" },
  { value: "ideia", label: "ideia" },
  { value: "roteiro", label: "roteiro" },
  { value: "pronto", label: "pronto" },
  { value: "publicado", label: "publicado" },
];

export function FiltersBar() {
  const { view, setView, filters, setFilters } = useStore();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex rounded-full border border-line bg-white p-0.5">
        <button
          type="button"
          onClick={() => setView("calendario")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] lowercase ${
            view === "calendario" ? "bg-cream-muted text-ink" : "text-ink-muted"
          }`}
        >
          <CalendarDays size={13} strokeWidth={1.6} />
          calendário
        </button>
        <button
          type="button"
          onClick={() => setView("lista")}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] lowercase ${
            view === "lista" ? "bg-cream-muted text-ink" : "text-ink-muted"
          }`}
        >
          <List size={13} strokeWidth={1.6} />
          lista
        </button>
      </div>

      <select
        value={filters.format}
        onChange={(e) => setFilters({ format: e.target.value as FiltersFormat })}
        className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] lowercase text-ink-muted outline-none"
      >
        {formats.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value as FiltersStatus })}
        className="rounded-full border border-line bg-white px-3 py-1.5 text-[12px] lowercase text-ink-muted outline-none"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type FiltersFormat = "todos" | Format;
type FiltersStatus = "todos" | Status;
