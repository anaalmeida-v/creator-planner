import type { ContentItem, Format, Status } from "./types";

const WEEKDAYS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const MONTHS_SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MONTHS_LONG = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function parseDate(iso: string) {
  return new Date(iso);
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function formatPanelDate(iso: string) {
  const d = parseDate(iso);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()} - ${WEEKDAYS[d.getDay()]} - ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatListDate(iso: string) {
  const d = parseDate(iso);
  return `${pad(d.getDate())} ${MONTHS_SHORT[d.getMonth()]}`;
}

export function formatTime(iso: string) {
  const d = parseDate(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function monthLabel(year: number, month: number) {
  return `${MONTHS_LONG[month]} ${year}`;
}

export function sameDay(iso: string, year: number, month: number, day: number) {
  const d = parseDate(iso);
  return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
}

export function toDateInput(iso: string) {
  const d = parseDate(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function toDateTimeLocal(iso: string) {
  return `${toDateInput(iso)}T${formatTime(iso)}`;
}

export function fromDateAndTime(date: string, time = "18:00") {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0).toISOString();
}

export function slugifyCover(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatLabel(format: Format) {
  return format === "shorts" ? "shorts" : "vídeo longo";
}

export function statusLabel(status: Status) {
  const map: Record<Status, string> = {
    ideia: "ideia",
    roteiro: "roteiro",
    pronto: "pronto",
    publicado: "publicado",
  };
  return map[status];
}

export function uid() {
  return crypto.randomUUID();
}

export function defaultFromIdea(idea: string, format: Format, publishAt: string): ContentItem {
  const cover = slugifyCover(idea);
  return {
    id: uid(),
    format,
    idea: idea.trim(),
    publishAt,
    coverText: cover,
    studioTitle: format === "shorts" ? `${cover} ✨` : `${cover} ☕️`,
    script: {
      hook: "abre com uma pergunta simples e visual nos primeiros 3 segundos.",
      scenes: "mostra o contexto, o processo e um detalhe íntimo do dia a dia.",
      cta: "fecha convidando a salvar o vídeo e contar nos comentários.",
    },
    description: `${idea.trim()}\n\num convite para ir no seu ritmo.\n\n#oopsaninha #conteudo`,
    tags: ["oopsaninha", "rotina", format === "shorts" ? "shorts" : "youtube"],
    status: "ideia",
  };
}
