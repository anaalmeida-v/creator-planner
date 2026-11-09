"use client";

import { Plus, Search } from "lucide-react";
import { DetailsPanel } from "@/components/details/DetailsPanel";
import { useStore } from "@/lib/store";
import { AgendaList } from "./AgendaList";
import { CalendarGrid } from "./CalendarGrid";
import { KanBanBoard } from "./KanbanBoard";
import { FiltersBar } from "./FiltersBar";
import { QuickAdd } from "./QuickAdd";
import type { ContentItem } from "@/lib/types";

export function PlannerView() {
  const store = useStore() as unknown as Record<string, unknown>;
  const view = store.view as string;
  const selected = store.selected;
  const filters = (store.filters as { query?: string }) || {};
  const setFilters = store.setFilters as (filters: { query?: string }) => void;
  const items = (store.items as ContentItem[]) || [];
  const updateStatus = store.updateStatus as (id: string, status: string) => void;
  const setSelected = store.setSelected as (id: string | null) => void;

  const split = Boolean(selected);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-neutral-50/20 pb-20 lg:pb-0">
      {/* Header Desktop */}
      <header className="hidden border-b border-line px-8 py-4 lg:block shrink-0 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-medium lowercase tracking-tight">seu conteúdo, no seu ritmo.</h1>
            <p className="mt-0.5 text-[13px] text-ink-muted">que ideia quer colocar no papel hoje?</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="relative">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                value={filters?.query || ''}
                onChange={(e) => setFilters?.({ query: e.target.value })}
                placeholder="buscar"
                className="w-44 rounded-full border border-line bg-white py-1.5 pl-8 pr-3 text-[13px] outline-none placeholder:text-ink-soft focus:border-neutral-400"
              />
            </label>
            <a
              href="#nova-ideia"
              className="inline-flex items-center gap-1.5 rounded-full bg-coffee px-4 py-1.5 text-[13px] lowercase text-white hover:opacity-90 transition-opacity"
            >
              <Plus size={14} />
              novo conteúdo
            </a>
          </div>
        </div>
        <div className="mt-3">
          <FiltersBar />
        </div>
      </header>

      {/* Header Mobile */}
      <div className="px-4 py-3 lg:hidden shrink-0 bg-white border-b border-line sticky top-0 z-20 shadow-xs">
        <h1 className="text-[18px] font-medium lowercase leading-tight">seu conteúdo, no seu ritmo.</h1>
        <div className="mt-3">
          <FiltersBar />
        </div>
      </div>

      {/* Área Central Flexível */}
      <div className="flex-1 flex flex-col p-4 lg:px-8 lg:py-6">
        <div className="flex-1 flex flex-col">
          {view === "calendario" && <CalendarGrid />}
          {view === "lista" && <AgendaList />}
          {view === "kanban" && (
            <KanBanBoard 
              items={items} 
              onSelectCard={(item) => setSelected?.(item.id)} 
              onStatusChange={(id, status) => updateStatus?.(id, status)} 
            />
          )}
        </div>
      </div>

      {/* QuickAdd no Rodapé */}
      <div id="nova-ideia" className="px-4 lg:px-8 pb-6 mt-auto">
        <QuickAdd />
      </div>

      {/* Modal Centralizado / Painel de Detalhes Flutuante */}
      {split && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end lg:items-center justify-center p-0 lg:p-4">
          <div className="bg-white w-full lg:max-w-4xl h-[90vh] lg:max-h-[90vh] rounded-t-3xl lg:rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <DetailsPanel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}