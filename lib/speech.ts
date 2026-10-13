// Röst i webbläsaren – gratis, inga API-nycklar.
// Lyssna: webbläsarens taligenkänning (Chrome, Edge, Safari).
// Tala: webbläsarens inbyggda röster.
// Senare kan "speak" bytas mot en klonad röst eller en talande videoavatar utan att resten ändras.

import type { Lang } from "./i18n";

const LOCALE: Record<Lang, string> = { sv: "sv-SE", en: "en-GB" };

// Röster som brukar låta bäst (Apple, Google, Microsoft). Första som finns används.
const PREFERRED_VOICES: Record<Lang, string[]> = {
  sv: ["Alva", "Klara", "Sofie", "Google svenska", "Microsoft Sofie", "Microsoft Hillevi"],
  en: ["Serena", "Kate", "Martha", "Google UK English Female", "Microsoft Libby", "Samantha"],
};

// Minimal typ för taligenkänning (finns inte i TypeScripts standardtyper)
type RecognitionResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
export type Recognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function recognitionClass(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function canListen(): boolean {
  return recognitionClass() !== null;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function createRecognition(lang: Lang): Recognition | null {
  const Cls = recognitionClass();
  if (!Cls) return null;
  const r = new Cls();
  r.lang = LOCALE[lang];
  r.interimResults = false;
  r.maxAlternatives = 1;
  r.continuous = false;
  return r;
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const code = lang.toLowerCase();
  const matching = voices.filter((v) => v.lang.toLowerCase().startsWith(code));
  for (const name of PREFERRED_VOICES[lang]) {
    const found = matching.find((v) => v.name.includes(name));
    if (found) return found;
  }
  return matching[0];
}

// iPhone kräver att rösten "låses upp" vid ett knapptryck innan den kan tala.
export function unlockSpeech() {
  if (!canSpeak()) return;
  try {
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignorera */
  }
}

export function speak(text: string, lang: Lang, onStart?: () => void, onEnd?: () => void) {
  if (!canSpeak()) {
    onEnd?.();
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\n+/g, " "));
  u.lang = LOCALE[lang];
  const voice = pickVoice(lang);
  if (voice) u.voice = voice;
  u.rate = 1;
  u.pitch = 1.05;
  u.onstart = () => onStart?.();
  u.onend = () => onEnd?.();
  u.onerror = () => onEnd?.();
  synth.speak(u);
}

export function stopSpeaking() {
  if (canSpeak()) window.speechSynthesis.cancel();
}
