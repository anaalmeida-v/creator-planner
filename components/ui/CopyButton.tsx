"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  label = "copiar",
  className = "",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  async function onCopy() {
    await copyText(value);
    setDone(true);
    window.setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] lowercase text-ink-muted transition hover:text-ink ${className}`}
    >
      {done ? <Check size={13} strokeWidth={1.8} /> : <Copy size={13} strokeWidth={1.6} />}
      {done ? "copiado" : label}
    </button>
  );
}
