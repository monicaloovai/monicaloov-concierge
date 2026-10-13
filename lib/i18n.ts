// Språkstöd. För att lägga till ett nytt språk senare:
// 1) lägg till koden i LANGS, 2) lägg till texter i UI nedan och i hotellets data.

export const LANGS = ["sv", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = {
  sv: "Svenska",
  en: "English",
};

// En text som finns på alla språk
export type Text = Record<Lang, string>;

export const UI = {
  tagline: { sv: "Your Personal AI Concierge", en: "Your Personal AI Concierge" },
  askPlaceholder: {
    sv: "Skriv din fråga här…",
    en: "Type your question here…",
  },
  askButton: { sv: "Fråga", en: "Ask" },
  askTitle: { sv: "Ställ en fråga till Monica", en: "Ask Monica a question" },
  quickTitle: { sv: "Snabbval", en: "Quick options" },
  servicesTitle: { sv: "Hur kan jag hjälpa dig?", en: "How may I assist you?" },
  back: { sv: "Tillbaka", en: "Back" },
  showMore: { sv: "Visa", en: "Show" },
  demoBadge: { sv: "Demo", en: "Demo" },
  demoNotice: {
    sv: "Demoversion – all hotellinformation är fiktiv och endast exempel.",
    en: "Demo version – all hotel information is fictional and for illustration only.",
  },
  chatNotice: {
    sv: "Demoläge: svaren hämtas från hotellets information. Riktig AI-chatt kopplas in i ett senare steg.",
    en: "Demo mode: answers come from the hotel's information. Live AI chat is connected in a later step.",
  },
  fallback: {
    sv: "Det kan jag tyvärr inte svara på ännu. Receptionen hjälper dig gärna – vill du kontakta dem?",
    en: "I'm afraid I can't answer that yet. Our reception will be happy to help – would you like to contact them?",
  },
  switchedToEn: {
    sv: "Of course! I'd be happy to assist you in English. How can I help you today?",
    en: "Of course! I'd be happy to assist you in English. How can I help you today?",
  },
  switchedToSv: {
    sv: "Självklart! Jag hjälper dig gärna på svenska. Vad kan jag hjälpa dig med?",
    en: "Självklart! Jag hjälper dig gärna på svenska. Vad kan jag hjälpa dig med?",
  },
  linkNotSet: {
    sv: "Länken läggs in av hotellet",
    en: "Link is configured by the hotel",
  },
  bookingDisclaimer: {
    sv: "Bokningar görs i hotellets egna system. En bokning är bekräftad först när du fått bekräftelse därifrån.",
    en: "Bookings are made in the hotel's own systems. A booking is only confirmed once you receive confirmation from there.",
  },
  contactFormTitle: { sv: "Skicka ett meddelande", en: "Send a message" },
  name: { sv: "Namn", en: "Name" },
  email: { sv: "E-post", en: "Email" },
  room: { sv: "Rumsnummer (valfritt)", en: "Room number (optional)" },
  message: { sv: "Meddelande", en: "Message" },
  send: { sv: "Skicka", en: "Send" },
  sending: { sv: "Skickar…", en: "Sending…" },
  sent: {
    sv: "Tack! Ditt meddelande har skickats till receptionen.",
    en: "Thank you! Your message has been sent to reception.",
  },
  sendError: {
    sv: "Något gick fel. Försök igen eller ring receptionen.",
    en: "Something went wrong. Please try again or call reception.",
  },
  formNotConnected: {
    sv: "Kontaktformuläret är inte kopplat ännu (demo). Ring eller mejla receptionen så länge.",
    en: "The contact form is not connected yet (demo). Please call or email reception for now.",
  },
  talk: { sv: "Prata med Monica", en: "Talk to Monica" },
  listening: { sv: "Jag lyssnar…", en: "I'm listening…" },
  speaking: { sv: "Monica talar…", en: "Monica is speaking…" },
  tapToStop: { sv: "Tryck för att avbryta", en: "Tap to stop" },
  hearWelcome: { sv: "Hör Monica hälsa välkommen", en: "Hear Monica's welcome" },
  playAnswer: { sv: "Lyssna på svaret", en: "Listen to the answer" },
  micDenied: {
    sv: "Jag fick inte tillgång till mikrofonen. Tillåt mikrofonen i webbläsaren och försök igen.",
    en: "I couldn't access the microphone. Please allow the microphone in your browser and try again.",
  },
  didNotHear: {
    sv: "Jag hörde tyvärr inte riktigt. Försök gärna igen.",
    en: "Sorry, I didn't quite catch that. Please try again.",
  },
  voiceNotSupported: {
    sv: "Röststyrning stöds inte i den här webbläsaren. Prova Safari eller Chrome – eller skriv din fråga.",
    en: "Voice is not supported in this browser. Try Safari or Chrome – or type your question.",
  },
  poweredBy: { sv: "Drivs av MonicaLoov.ai", en: "Powered by MonicaLoov.ai" },
  cubiqoLine: {
    sv: "Du hittade mig via Cubiqo – hotellets digitala ingång.",
    en: "You found me via Cubiqo – the hotel's digital entrance.",
  },
} satisfies Record<string, Text>;
