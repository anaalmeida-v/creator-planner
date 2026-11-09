import { CreatorProfile } from './types';

// Perfil predefinido do canal (Oopsaninha)
export const DEFAULT_PROFILE: CreatorProfile = {
  channelName: 'oopsaninha',
  socialHandle: '@oopsaninha',
  titleStyle: 'lowercase',
  thumbnailMaxWords: 3,
  hashtags: ['#vlog', '#lifestyle', '#oopsaninha', '#rotina'],
};

/**
 * Função utilitária para formatar qualquer título de acordo com as regras do Perfil
 */
export function formatTitleByPattern(rawTitle: string, profile: CreatorProfile = DEFAULT_PROFILE): string {
  let formatted = rawTitle.trim();

  if (profile.titleStyle === 'lowercase') {
    formatted = formatted.toLowerCase();
  } else if (profile.titleStyle === 'uppercase') {
    formatted = formatted.toUpperCase();
  }

  return formatted;
}

/**
 * Utilitário para formatar texto da Thumbnail em Caixa Alta e Curto (Máx 2-3 palavras)
 */
export function formatThumbnailText(text: string, maxWords: number = 3): string {
  const words = text.toUpperCase().replace(/[^\w\s]/gi, '').split(/\s+/);
  return words.slice(0, maxWords).join(' ');
}