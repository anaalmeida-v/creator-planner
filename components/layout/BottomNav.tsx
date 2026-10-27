"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Lightbulb, ScrollText } from "lucide-react";

const links = [
  { href: "/", label: "planner", icon: CalendarDays },
  { href: "/ideias", label: "ideias", icon: Lightbulb },
  { href: "/roteiros", label: "roteiros", icon: ScrollText },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-cream/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] lowercase ${
                active ? "text-coffee" : "text-ink-muted"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.6} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
