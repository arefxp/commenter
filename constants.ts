export interface Tone {
  id: string;
  label: string;
  emoji: string;
}

export const TONES: Tone[] = [
  { id: 'professional', label: 'Professional', emoji: '🤝' },
  { id: 'casual', label: 'Casual', emoji: '😊' },
  { id: 'humorous', label: 'Humorous', emoji: '😂' },
  { id: 'analytical', label: 'Analytical', emoji: '📊' },
  { id: 'supportive', label: 'Supportive', emoji: '🙌' },
  { id: 'inquisitive', label: 'Inquisitive', emoji: '🤔' },
];

export interface CommentLength {
    id: string;
    label: string;
    description: string;
}

export const LENGTHS: CommentLength[] = [
    { id: 'short', label: 'Short', description: '1-2 sentences' },
    { id: 'medium', label: 'Medium', description: '2-4 sentences' },
    { id: 'long', label: 'Long', description: '4-6 sentences' },
];
