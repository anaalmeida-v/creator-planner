"use client";

import { DetailsPanel } from "@/components/details/DetailsPanel";
import { FormatBadge } from "@/components/ui/FormatBadge";
import { StatusDot } from "@/components/ui/StatusDot";
import { useStore } from "@/lib/store";

export default function RoteirosPage() {
  const { items, selected, select } = useStore();
  const scripts = items.filter((it) => it.status === "roteiro" || it.status === "pronto");

  return (
    <div className="flex min-h-0 flex-1">
      <div className="min-w-0 flex-1 overflow-y-auto px-4 py-6 pb-28 lg:px-8 lg:pb-8">
        <div className="mb-6">
          <h1 className="text-[26px] font-medium lowercase">roteiros</h1>
          <p className="mt-1 text-[13px] text-ink-muted">hook, cenas e cta prontos para gravar.</p>
        </div>

        <div className="space-y-3">
          {scripts.length === 0 && (
            <p className="rounded-2xl border border-dashed border-line px-4 py-10 text-center text-[13px] text-ink-muted">
              nenhum roteiro em andamento. abra uma ideia e escreva o hook.
            </p>
          )}
          {scripts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => select(item.id)}
              className="w-full rounded-3xl border border-line bg-white p-5 text-left shadow-card"
            >
              <div className="flex flex-wrap items-center gap-2">
                <FormatBadge format={item.format} />
                <StatusDot status={item.status} />
              </div>
              <p className="mt-3 text-[18px] lowercase">{item.coverText}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <ScriptPreview label="hook" text={item.script.hook} />
                <ScriptPreview label="cenas" text={item.script.scenes} />
                <ScriptPreview label="cta" text={item.script.cta} />
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <DetailsPanel />}
    </div>
  );
}

function ScriptPreview({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl bg-cream px-3 py-3">
      <p className="text-[11px] lowercase text-ink-muted">{label}</p>
      <p className="mt-1 line-clamp-4 text-[13px] leading-relaxed">{text}</p>
    </div>
  );
}
