'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Planner', icon: '📅' },
    { href: '/ideias', label: 'Ideias', icon: '💡' },
    { href: '/roteiros', label: 'Roteiros', icon: '📝' },
    { href: '/settings', label: 'Ajustes', icon: '⚙️' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-neutral-200 z-50 px-4 py-2 flex justify-around items-center">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
              isActive ? 'text-black font-semibold' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}