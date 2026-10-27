"use client";

import { Plus, Search } from "lucide-react";
import { DetailsPanel } from "@/components/details/DetailsPanel";
import { useStore } from "@/lib/store";
import { AgendaList } from "./AgendaList";
import { CalendarGrid } from "./CalendarGrid";
import { FiltersBar } from "./FiltersBar";
import { QuickAdd } from "./QuickAdd";

export function PlannerView() {
  const { view, selected, filters, setFilters } = useStore();
  const split = Boolean(selected);

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="hidden border-b border-line px-8 py-6 lg:block">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-medium lowercase tracking-tight">seu conteúdo, no seu ritmo.</h1>
              <p className="mt-1 text-[13px] text-ink-muted">que ideia quer colocar no papel hoje?</p>
            </div>
            <div className="flex items-center gap-2">
              <label className="relative">
                <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  value={filters.query}
                  onChange={(e) => setFilters({ query: e.target.value })}
                  placeholder="buscar"
                  className="w-44 rounded-full border border-line bg-white py-2 pl-8 pr-3 text-[13px] outline-none placeholder:text-ink-soft"
                />
              </label>
              <a
                href="#nova-ideia"
                className="inline-flex items-center gap-1.5 rounded-full bg-coffee px-4 py-2 text-[13px] lowercase text-white"
              >
                <Plus size={14} />
                novo conteúdo
              </a>
            </div>
          </div>
          <div className="mt-5">
            <FiltersBar />
          </div>
        </header>

        <div className="px-4 py-4 lg:hidden">
          <h1 className="text-[24px] font-medium lowercase leading-tight">seu conteúdo, no seu ritmo.</h1>
          <div className="mt-4">
            <FiltersBar />
          </div>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-28 lg:px-8 lg:pb-8">
          {view === "calendario" && !split && <CalendarGrid />}
          {view === "calendario" && split && (
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <CalendarGrid compact />
              <AgendaList title="sua agenda" />
            </div>
          )}
          {view === "lista" && <AgendaList />}
          <div id="nova-ideia">
            <QuickAdd />
          </div>
        </div>
      </div>
      {split && <DetailsPanel />}
    </div>
  );
}
