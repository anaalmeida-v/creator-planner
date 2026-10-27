"use client";

import { Search, Settings, X } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { useStore } from "@/lib/store";

export function MobileHeader() {
  const { filters, setFilters } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-20 border-b border-line bg-cream/95 px-4 py-3 backdrop-blur-md pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[18px] font-medium lowercase leading-none">oopsaninha</p>
            <p className="mt-1 text-[11px] lowercase text-ink-muted">seu espaço criativo</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-full p-2 text-ink-muted hover:bg-white"
              aria-label="buscar"
            >
              {searchOpen ? <X size={18} /> : <Search size={18} strokeWidth={1.6} />}
            </button>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="rounded-full p-2 text-ink-muted hover:bg-white"
              aria-label="configurações"
            >
              <Settings size={18} strokeWidth={1.6} />
            </button>
          </div>
        </div>
        {searchOpen && (
          <input
            autoFocus
            value={filters.query}
            onChange={(e) => setFilters({ query: e.target.value })}
            placeholder="buscar ideias, capas, tags..."
            className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-2.5 text-[14px] outline-none placeholder:text-ink-soft"
          />
        )}
      </header>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
