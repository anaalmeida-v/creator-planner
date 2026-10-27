"use client";

import { Download, RotateCcw, X } from "lucide-react";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

export function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { resetData, items } = useStore();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/20 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <p className="text-lg lowercase">configurações</p>
            <p className="mt-1 text-[13px] text-ink-muted">tudo fica salvo neste aparelho.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-ink-muted hover:bg-cream-muted" aria-label="fechar">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3 text-[13px]">
          <div className="rounded-2xl border border-line bg-cream px-4 py-3">
            <p className="lowercase text-ink-muted">itens salvos</p>
            <p className="mt-1 text-base">{items.length} conteúdos no planner</p>
          </div>
          <p className="text-ink-muted leading-relaxed">
            no celular, use o menu do navegador e toque em <span className="text-ink">adicionar à tela inicial</span> para
            instalar o oopsaninha como app.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              resetData();
              onClose();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] lowercase text-ink-muted hover:bg-cream-muted"
          >
            <RotateCcw size={14} />
            restaurar exemplos
          </button>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coffee px-4 py-2 text-[13px] lowercase text-white"
          >
            <Download size={14} />
            publicar na vercel
          </a>
        </div>
      </div>
    </div>
  );
}
