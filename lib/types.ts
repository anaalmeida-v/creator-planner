export type Format = "video-longo" | "shorts" | "reels" | "tiktok";

export type Status = 
  | "ideia" 
  | "roteiro" 
  | "gravacao" 
  | "edicao" 
  | "pronto" 
  | "publicado";

export type ViewMode = "calendario" | "lista" | "kanban";

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

export interface CreatorProfile {
  channelName: string;
  channelUrl?: string;
  titleStyle: "lowercase" | "uppercase" | "capitalized";
  thumbnailMaxWords: number;
  hashtags: string[];
  socialHandle: string;
}