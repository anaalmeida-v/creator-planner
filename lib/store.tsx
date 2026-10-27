"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { seedContent, STORAGE_KEY } from "./seed";
import type { ContentItem, Filters, Status, ViewMode } from "./types";

interface StoreValue {
  items: ContentItem[];
  ready: boolean;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  filters: Filters;
  setFilters: (patch: Partial<Filters>) => void;
  selectedId: string | null;
  select: (id: string | null) => void;
  selected: ContentItem | null;
  addItem: (item: ContentItem) => void;
  updateItem: (id: string, patch: Partial<ContentItem>) => void;
  deleteItem: (id: string) => void;
  markReady: (id: string) => void;
  resetData: () => void;
  monthCursor: { year: number; month: number };
  setMonthCursor: (next: { year: number; month: number }) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const defaultFilters: Filters = { format: "todos", status: "todos", query: "" };

function loadItems(): ContentItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedContent;
    const parsed = JSON.parse(raw) as ContentItem[];
    return Array.isArray(parsed) && parsed.length ? parsed : seedContent;
  } catch {
    return seedContent;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ContentItem[]>(seedContent);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<ViewMode>("calendario");
  const [filters, setFiltersState] = useState<Filters>(defaultFilters);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [monthCursor, setMonthCursor] = useState({ year: 2026, month: 9 });

  useEffect(() => {
    setItems(loadItems());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const setFilters = useCallback((patch: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...patch }));
  }, []);

  const addItem = useCallback((item: ContentItem) => {
    setItems((prev) => [item, ...prev]);
    setSelectedId(item.id);
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<ContentItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setSelectedId((current) => (current === id ? null : current));
  }, []);

  const markReady = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: "pronto" as Status } : it)),
    );
  }, []);

  const resetData = useCallback(() => {
    setItems(seedContent);
    setSelectedId(null);
  }, []);

  const selected = useMemo(
    () => items.find((it) => it.id === selectedId) ?? null,
    [items, selectedId],
  );

  const value: StoreValue = {
    items,
    ready,
    view,
    setView,
    filters,
    setFilters,
    selectedId,
    select: setSelectedId,
    selected,
    addItem,
    updateItem,
    deleteItem,
    markReady,
    resetData,
    monthCursor,
    setMonthCursor,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useFilteredItems() {
  const { items, filters } = useStore();
  return useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return items
      .filter((it) => (filters.format === "todos" ? true : it.format === filters.format))
      .filter((it) => (filters.status === "todos" ? true : it.status === filters.status))
      .filter((it) => {
        if (!q) return true;
        return (
          it.idea.toLowerCase().includes(q) ||
          it.coverText.toLowerCase().includes(q) ||
          it.studioTitle.toLowerCase().includes(q) ||
          it.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .slice()
      .sort((a, b) => +new Date(a.publishAt) - +new Date(b.publishAt));
  }, [items, filters]);
}
