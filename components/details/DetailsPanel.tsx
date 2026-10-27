"use client";

import { Check, Figma, Trash2, X } from "lucide-react";
import { CopyButton, copyText } from "@/components/ui/CopyButton";
import { FormatBadge } from "@/components/ui/FormatBadge";
import { StatusDot } from "@/components/ui/StatusDot";
import { useStore } from "@/lib/store";
import type { Format, Status } from "@/lib/types";
import { formatPanelDate, slugifyCover, toDateTimeLocal } from "@/lib/utils";

export function DetailsPanel() {
  const { selected, select, updateItem, markReady, deleteItem } = useStore();
  if (!selected) return null;

  const item = selected;

  async function createCover() {
    await copyText(item.coverText);
    window.open("https://www.figma.com", "_blank", "noreferrer");
  }

  return (
    <aside className="fixed inset-0 z-40 flex flex-col bg-cream lg:static lg:z-auto lg:h-auto lg:w-[440px] lg:shrink-0 lg:border-l lg:border-line">
      <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <FormatBadge format={item.format} />
            <StatusDot status={item.status} />
          </div>
          <h2 className="mt-2 text-[22px] font-medium lowercase leading-tight">{item.coverText}</h2>
          <p className="mt-1 text-[12px] text-ink-muted">{formatPanelDate(item.publishAt)}</p>
        </div>
        <button
          type="button"
          onClick={() => select(null)}
          className="rounded-full p-2 text-ink-muted hover:bg-white"
          aria-label="fechar detalhes"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 pb-28 lg:pb-5">
        <section>
          <p className="mb-2 text-[11px] lowercase tracking-wide text-ink-muted">ideia central</p>
          <textarea
            value={item.idea}
            onChange={(e) => updateItem(item.id, { idea: e.target.value })}
            rows={3}
            className="w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 text-[14px] leading-relaxed outline-none"
          />
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] lowercase tracking-wide text-ink-muted">01 · capa e título</p>
          </div>
          <div className="rounded-3xl border border-line bg-white p-4">
            <p className="text-[11px] lowercase text-ink-muted">texto da capa · sem emojis</p>
            <input
              value={item.coverText}
              onChange={(e) => updateItem(item.id, { coverText: slugifyCover(e.target.value) })}
              className="mt-2 w-full bg-transparent text-[26px] font-medium lowercase leading-tight outline-none"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={createCover}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] lowercase text-ink-muted hover:text-ink"
              >
                <Figma size={13} />
                criar capa no figma
              </button>
              <CopyButton value={item.coverText} label="copiar texto" />
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-line bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] lowercase text-ink-muted">título no studio</p>
              <CopyButton value={item.studioTitle} />
            </div>
            <input
              value={item.studioTitle}
              onChange={(e) => updateItem(item.id, { studioTitle: e.target.value.toLowerCase() })}
              className="mt-1 w-full bg-transparent text-[15px] outline-none"
            />
          </div>
        </section>

        <section>
          <p className="mb-3 text-[11px] lowercase tracking-wide text-ink-muted">02 · assistente de roteiro</p>
          <div className="space-y-3">
            <ScriptField
              step="01"
              title="hook · primeiros 3s"
              value={item.script.hook}
              onChange={(hook) => updateItem(item.id, { script: { ...item.script, hook } })}
            />
            <ScriptField
              step="02"
              title="cenas / ações"
              value={item.script.scenes}
              onChange={(scenes) => updateItem(item.id, { script: { ...item.script, scenes } })}
            />
            <ScriptField
              step="03"
              title="cta para encerrar"
              value={item.script.cta}
              onChange={(cta) => updateItem(item.id, { script: { ...item.script, cta } })}
            />
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] lowercase tracking-wide text-ink-muted">03 · descrição e tags</p>
            <CopyButton value={`${item.description}\n\n${item.tags.map((t) => `#${t}`).join(" ")}`} label="copiar tudo" />
          </div>
          <textarea
            value={item.description}
            onChange={(e) => updateItem(item.id, { description: e.target.value })}
            rows={7}
            className="w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 text-[13px] leading-relaxed outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => copyText(`#${tag}`)}
                className="rounded-full bg-badge-long px-2.5 py-1 text-[11px] text-coffee-dark"
              >
                #{tag}
              </button>
            ))}
          </div>
          <input
            placeholder="adicionar tag e enter"
            className="mt-3 w-full rounded-2xl border border-line bg-white px-3 py-2 text-[13px] outline-none placeholder:text-ink-soft"
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              const value = e.currentTarget.value.replace(/^#/, "").trim().toLowerCase();
              if (!value || item.tags.includes(value)) return;
              updateItem(item.id, { tags: [...item.tags, value] });
              e.currentTarget.value = "";
            }}
          />
        </section>

        <section className="grid grid-cols-2 gap-3">
          <label className="text-[11px] lowercase text-ink-muted">
            formato
            <select
              value={item.format}
              onChange={(e) => updateItem(item.id, { format: e.target.value as Format })}
              className="mt-1 w-full rounded-2xl border border-line bg-white px-3 py-2.5 text-[13px] outline-none"
            >
              <option value="video-longo">vídeo longo</option>
              <option value="shorts">shorts</option>
            </select>
          </label>
          <label className="text-[11px] lowercase text-ink-muted">
            status
            <select
              value={item.status}
              onChange={(e) => updateItem(item.id, { status: e.target.value as Status })}
              className="mt-1 w-full rounded-2xl border border-line bg-white px-3 py-2.5 text-[13px] outline-none"
            >
              <option value="ideia">ideia</option>
              <option value="roteiro">roteiro</option>
              <option value="pronto">pronto</option>
              <option value="publicado">publicado</option>
            </select>
          </label>
          <label className="col-span-2 text-[11px] lowercase text-ink-muted">
            data de publicação
            <input
              type="datetime-local"
              value={toDateTimeLocal(item.publishAt)}
              onChange={(e) => updateItem(item.id, { publishAt: new Date(e.target.value).toISOString() })}
              className="mt-1 w-full rounded-2xl border border-line bg-white px-3 py-2.5 text-[13px] outline-none"
            />
          </label>
        </section>
      </div>

      <div className="border-t border-line bg-cream px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => deleteItem(item.id)}
            className="rounded-2xl border border-line px-3 py-3 text-ink-muted hover:bg-white"
            aria-label="excluir"
          >
            <Trash2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => markReady(item.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-coffee py-3 text-[14px] lowercase text-white hover:bg-coffee-dark"
          >
            <Check size={16} />
            marcar como pronto
          </button>
        </div>
      </div>
    </aside>
  );
}

function ScriptField({
  step,
  title,
  value,
  onChange,
}: {
  step: string;
  title: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white px-4 py-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[12px] lowercase text-ink">
          <span className="mr-2 text-ink-soft">{step}</span>
          {title}
        </p>
        <CopyButton value={value} />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none bg-transparent text-[13px] leading-relaxed outline-none"
      />
    </div>
  );
}
