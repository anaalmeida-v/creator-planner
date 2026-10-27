export type Format = "video-longo" | "shorts";
export type Status = "ideia" | "roteiro" | "pronto" | "publicado";
export type ViewMode = "calendario" | "lista";

export interface ScriptBlock {
  hook: string;
  scenes: string;
  cta: string;
}

export interface ContentItem {
  id: string;
  format: Format;
  idea: string;
  publishAt: string;
  coverText: string;
  studioTitle: string;
  script: ScriptBlock;
  description: string;
  tags: string[];
  status: Status;
}

export interface Filters {
  format: "todos" | Format;
  status: "todos" | Status;
  query: string;
}
