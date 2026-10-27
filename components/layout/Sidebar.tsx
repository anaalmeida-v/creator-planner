"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Lightbulb, ScrollText, Settings } from "lucide-react";
import { useState } from "react";
import { SettingsModal } from "@/components/settings/SettingsModal";

const links = [
  { href: "/", label: "planner", icon: CalendarDays },
  { href: "/ideias", label: "banco de ideias", icon: Lightbulb },
  { href: "/roteiros", label: "roteiros", icon: ScrollText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="hidden lg:flex h-dvh w-[240px] shrink-0 flex-col border-r border-line bg-cream-muted/60">
      <div className="px-6 pt-8 pb-10">
        <p className="text-[22px] font-medium tracking-tight lowercase leading-none">oopsaninha</p>
        <p className="mt-2 text-[13px] text-ink-muted lowercase">seu espaço criativo</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] lowercase transition ${
                active ? "bg-white text-ink shadow-card" : "text-ink-muted hover:bg-white/70 hover:text-ink"
              }`}
            >
              <Icon size={18} strokeWidth={1.6} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line px-4 py-4">
        <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-card">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-badge-long text-[12px] text-coffee-dark">
              a
            </div>
            <div>
              <p className="text-[13px] lowercase leading-tight">aninha</p>
              <p className="text-[11px] text-ink-muted lowercase">criadora</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-cream-muted hover:text-ink"
            aria-label="configurações"
          >
            <Settings size={16} strokeWidth={1.6} />
          </button>
        </div>
      </div>
      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </aside>
  );
}
