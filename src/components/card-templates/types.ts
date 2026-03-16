export interface CardTheme {
  name: string;
  bg: string;
  accent: string;
  text: string;
}

export interface CardTemplateProps {
  theme: CardTheme;
  message: string;
  senderName: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  icon: string;
  aspect: string; // tailwind aspect ratio class
}

export const CARD_THEMES: CardTheme[] = [
  { name: "Midnight Gold", bg: "hsl(232, 70%, 11%)", accent: "hsl(51, 100%, 50%)", text: "hsl(45, 100%, 90%)" },
  { name: "Emerald Night", bg: "hsl(150, 32%, 12%)", accent: "hsl(51, 100%, 50%)", text: "hsl(45, 100%, 90%)" },
  { name: "Royal Purple", bg: "hsl(270, 50%, 15%)", accent: "hsl(45, 80%, 60%)", text: "hsl(45, 100%, 92%)" },
];

export const CARD_TEMPLATES: CardTemplate[] = [
  { id: "classic", name: "Classic", icon: "🕌", aspect: "aspect-[4/5]" },
  { id: "landscape", name: "Landscape", icon: "🌄", aspect: "aspect-[16/9]" },
  { id: "minimal", name: "Minimal", icon: "✨", aspect: "aspect-square" },
  { id: "ornate", name: "Ornate", icon: "🪬", aspect: "aspect-[3/4]" },
];
