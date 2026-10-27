"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { monthGrid, today as todayDate } from "@/lib/calendar";
import { useFilteredItems, useStore } from "@/lib/store";
import { monthLabel, sameDay } from "@/lib/utils";
import { ContentChip } from "./ContentChip";

const WEEK = ["d", "s", "t", "q", "q", "s", "s"];

export function CalendarGrid({ compact = false }: { compact?: boolean }) {
  const { monthCursor, setMonthCursor, selectedId, select } = useStore();
  const items = useFilteredItems();
  const days = monthGrid(monthCursor.year, monthCursor.month);
  const now = todayDate();

  function shift(delta: number) {
    const d = new Date(monthCursor.year, monthCursor.month + delta, 1);
    setMonthCursor({ year: d.getFullYear(), month: d.getMonth() });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-medium lowercase tracking-tight md:text-[26px]">
          {monthLabel(monthCursor.year, monthCursor.month)}
        </h2>
        <div className="flex gap-1">
          <button type="button" onClick={() => shift(-1)} className="rounded-full border border-line bg-white p-1.5 text-ink-muted hover:text-ink" aria-label="mês anterior">
            <ChevronLeft size={16} />
          </button>
          <button type="button" onClick={() => shift(1)} className="rounded-full border border-line bg-white p-1.5 text-ink-muted hover:text-ink" aria-label="próximo mês">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[11px] lowercase text-ink-muted">
        {WEEK.map((d, i) => (
          <div key={`${d}-${i}`} className="py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden rounded-2xl border border-line bg-white">
        {days.map((day) => {
          const inMonth = day.getMonth() === monthCursor.month;
          const isToday = day.getTime() === now.getTime();
          const dayItems = items.filter((it) =>
            sameDay(it.publishAt, day.getFullYear(), day.getMonth(), day.getDate()),
          );
          const max = compact ? 1 : 3;

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[88px] border-b border-r border-line p-1.5 last:border-r-0 md:min-h-[118px] ${
                compact ? "min-h-[72px] md:min-h-[86px]" : ""
              } ${inMonth ? "bg-white" : "bg-cream-muted/50"}`}
            >
              <div
                className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                  isToday ? "bg-coffee text-white" : inMonth ? "text-ink" : "text-ink-soft"
                }`}
              >
                {day.getDate()}
              </div>
              <div className="space-y-1">
                {dayItems.slice(0, max).map((item) => (
                  <ContentChip
                    key={item.id}
                    item={item}
                    compact
                    active={selectedId === item.id}
                    onClick={() => select(item.id)}
                  />
                ))}
                {dayItems.length > max && (
                  <p className="px-1 text-[10px] text-ink-muted">+{dayItems.length - max}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
