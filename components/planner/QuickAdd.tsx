"use client";

import { Plus } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import type { Format } from "@/lib/types";
import { defaultFromIdea, fromDateAndTime, pad } from "@/lib/utils";

export function QuickAdd() {
  const { addItem, monthCursor } = useStore();
  const defaultDate = useMemo(() => {
    const d = new Date(monthCursor.year, monthCursor.month, 28);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, [monthCursor]);

  const [format, setFormat] = useState<Format>("video-longo");
  const [idea, setIdea] = useState("");
  const [date, setDate] = useState(defaultDate);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!idea.trim()) return;
    addItem(defaultFromIdea(idea, format, fromDateAndTime(date, "18:00")));
    setIdea("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-line bg-white p-4 shadow-card md:p-5"
    >
      <p className="text-[15px] lowercase">ainda deu ideia?</p>
      <p className="mt-1 text-[12px] text-ink-muted">joga no planner agora, o roteiro a gente ajeita depois.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-[160px_1fr_160px_auto] md:items-end">
        <label className="block text-[11px] lowercase text-ink-muted">
          formato
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as Format)}
            className="mt-1 w-full rounded-2xl border border-line bg-cream px-3 py-2.5 text-[13px] text-ink outline-none"
          >
            <option value="video-longo">vídeo longo</option>
            <option value="shorts">shorts</option>
          </select>
        </label>

        <label className="block text-[11px] lowercase text-ink-muted">
          ideia central
          <input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="o que você quer falar?"
            className="mt-1 w-full rounded-2xl border border-line bg-cream px-3 py-2.5 text-[13px] outline-none placeholder:text-ink-soft"
          />
        </label>

        <label className="block text-[11px] lowercase text-ink-muted">
          publicação
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-line bg-cream px-3 py-2.5 text-[13px] outline-none"
          />
        </label>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-coffee px-4 py-2.5 text-[13px] lowercase text-white transition hover:bg-coffee-dark"
        >
          <Plus size={15} strokeWidth={1.8} />
          adicionar ideia
        </button>
      </div>
    </form>
  );
}
