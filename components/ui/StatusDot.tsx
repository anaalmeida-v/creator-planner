import type { Status } from "@/lib/types";
import { statusLabel } from "@/lib/utils";

const tones: Record<Status, string> = {
  ideia: "bg-ink-soft",
  roteiro: "bg-coffee",
  gravacao: "bg-amber-600",
  edicao: "bg-blue-600",
  pronto: "bg-emerald-700/80",
  publicado: "bg-neutral-400",
};

export function StatusDot({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${tones[status]}`} />
      {statusLabel(status)}
    </span>
  );
}