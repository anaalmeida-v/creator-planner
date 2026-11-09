'use client';

import React from 'react';
import { ContentItem, Status } from '@/lib/types';

interface KanbanBoardProps {
  items: ContentItem[];
  onSelectCard: (item: ContentItem) => void;
  onStatusChange: (itemId: string, newStatus: Status) => void;
}

const COLUMNS: { id: Status; label: string; icon: string }[] = [
  { id: 'ideia', label: 'Banco de Ideias', icon: '💡' },
  { id: 'roteiro', label: 'Em Roteiro', icon: '📝' },
  { id: 'gravacao', label: 'Para Gravar', icon: '🎥' },
  { id: 'edicao', label: 'Em Edição', icon: '✂️' },
  { id: 'pronto', label: 'Pronto / Agendado', icon: '📌' },
];

export function KanBanBoard({ items, onSelectCard, onStatusChange }: KanbanBoardProps) {
  return (
    <div className="h-full flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:snap-none">
      {COLUMNS.map((col) => {
        const columnItems = items.filter((item) => item.status === col.id);

        return (
          <div
            key={col.id}
            className="flex-1 min-w-[280px] max-w-[320px] bg-neutral-50/60 rounded-2xl p-4 border border-neutral-100 flex flex-col h-full snap-center"
          >
            {/* Header da Coluna */}
            <div className="flex items-center justify-between mb-3 px-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm">{col.icon}</span>
                <h3 className="font-medium text-sm text-neutral-800">{col.label}</h3>
              </div>
              <span className="text-xs bg-neutral-200/60 text-neutral-600 px-2 py-0.5 rounded-full font-mono">
                {columnItems.length}
              </span>
            </div>

            {/* Lista de Cards com Rolagem Interna */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-0 pr-1">
              {columnItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectCard(item)}
                  className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs hover:border-neutral-400 transition-all cursor-pointer group flex flex-col justify-between gap-3 shrink-0"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md ${
                        item.format === 'shorts' 
                          ? 'bg-amber-100/70 text-amber-800' 
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {item.format}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {item.publishAt ? new Date(item.publishAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : ''}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-neutral-900 group-hover:text-black line-clamp-2">
                      {item.idea || item.studioTitle || 'Sem título'}
                    </h4>
                  </div>

                  {/* Seletor de Status no Rodapé */}
                  <div className="pt-2 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-400">
                    <span>Mover para:</span>
                    <select
                      value={item.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => onStatusChange(item.id, e.target.value as Status)}
                      className="text-xs bg-neutral-100 text-neutral-700 rounded px-2 py-1 border-none focus:ring-1 focus:ring-neutral-400 cursor-pointer"
                    >
                      {COLUMNS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}

              {columnItems.length === 0 && (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center text-xs text-neutral-400">
                  Nenhum conteúdo nesta etapa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}