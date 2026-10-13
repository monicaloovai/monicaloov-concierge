// All hotellinformation samlas här i steg 1.
// I steg 2 flyttas samma struktur till Supabase – komponenterna behöver då inte ändras.

import type { Lang, Text } from "./i18n";

export type IconName =
  | "info"
  | "coffee"
  | "spa"
  | "restaurant"
  | "transport"
  | "explore"
  | "phone"
  | "book";

export type SectionId =
  | "hotel-info"
  | "breakfast"
  | "spa"
  | "restaurant"
  | "transport"
  | "explore"
  | "contact"
  | "book";

export type Row = { label: Text; value: Text | string };
export type Group = { heading: Text; rows: Row[] };
export type Action = { label: Text; href: string };

export type Section = {
  id: SectionId;
  icon: IconName;
  title: Text;
  subtitle: Text;
  // Kort svar som chatten använder i demoläget
  answer: Text;
  // Ord som gör att chatten hittar rätt avsnitt (små bokstäver)
  keywords: string[];
  groups: Group[];
  actions?: Action[];
  showContactForm?: boolean;
  showBookingDisclaimer?: boolean;
};

export type Hotel = {
  slug: string;
  name: string;
  isDemo: boolean;
  // Avatar: byt bild eller lägg in en video utan att ändra någon kod i komponenterna
  avatar: {
    imageUrl: string;
    videoUrl?: string; // t.ex. "/welcome.mp4" – visas istället för bilden om den finns
    alt: Text;
  };
  welcome: Text;
  quickPicks: SectionId[];
  reception: { phone: string; phoneDisplay: string; email: string; hours: Text };
  sections: Section[];
};

const grandAurora: Hotel = {
  slug: "grand-aurora",
  name: "The Grand Aurora Hotel",
  isDemo: true,
  avatar: {
    imageUrl: "/avatar.png",
    alt: {
      sv: "Monica, din digitala concierge, i hotellets lobby",
      en: "Monica, your digital concierge, in the hotel lobby",
    },
  },
  welcome: {
    sv: "Hej och varmt välkommen till The Grand Aurora Hotel!\n\nJag är Monica, din personliga digitala concierge.\n\nJag finns här för att hjälpa dig med allt från hotellinformation och frukosttider till restaurangtips, aktiviteter och bokningar.\n\nHur kan jag hjälpa dig idag?",
    en: "Hello and a warm welcome to The Grand Aurora Hotel!\n\nI'm Monica, your personal digital concierge.\n\nI'm here to help you with everything from hotel information and breakfast times to restaurant recommendations, activities and bookings.\n\nHow may I help you today?",
  },
  quickPicks: ["breakfast", "spa", "restaurant", "contact"],
  reception: {
    phone: "+46313900600",
    phoneDisplay: "+46 31 390 06 00",
    email: "reception@grandaurora.example",
    hours: { sv: "Dygnet runt, alla dagar", en: "24 hours, every day" },
  },
  sections: [
    {
      id: "hotel-info",
      icon: "info",
      title: { sv: "Hotellinformation", en: "Hotel Information" },
      subtitle: { sv: "Incheckning, Wi-Fi, faciliteter", en: "Check-in, Wi-Fi, facilities" },
      answer: {
        sv: "Incheckning sker från 15.00 och utcheckning senast 11.00. Wi-Fi-nätverket heter GrandAurora-Guest. Här är all hotellinformation:",
        en: "Check-in is from 3 pm and check-out is by 11 am. The Wi-Fi network is called GrandAurora-Guest. Here is all the hotel information:",
      },
      keywords: ["incheck", "utcheck", "check-in", "check in", "checkout", "check-out", "check out", "wifi", "wi-fi", "internet", "lösenord", "password", "parkering", "parking", "gym", "facilitet", "facilities", "regler", "rules", "husdjur", "pets"],
      groups: [
        {
          heading: { sv: "Din vistelse", en: "Your stay" },
          rows: [
            { label: { sv: "Incheckning", en: "Check-in" }, value: { sv: "Från 15.00", en: "From 3:00 pm" } },
            { label: { sv: "Utcheckning", en: "Check-out" }, value: { sv: "Senast 11.00", en: "By 11:00 am" } },
            { label: { sv: "Sen utcheckning", en: "Late check-out" }, value: { sv: "Fråga receptionen", en: "Ask reception" } },
          ],
        },
        {
          heading: { sv: "Wi-Fi", en: "Wi-Fi" },
          rows: [
            { label: { sv: "Nätverk", en: "Network" }, value: "GrandAurora-Guest" },
            { label: { sv: "Lösenord", en: "Password" }, value: "aurora-demo" },
          ],
        },
        {
          heading: { sv: "Faciliteter", en: "Facilities" },
          rows: [
            { label: { sv: "Gym", en: "Gym" }, value: { sv: "Plan 1, med rumsnyckel", en: "Floor 1, with room key" } },
            { label: { sv: "Parkering", en: "Parking" }, value: { sv: "Garage under hotellet – se Transport", en: "Garage below the hotel – see Transport" } },
            { label: { sv: "Bagageförvaring", en: "Luggage storage" }, value: { sv: "I receptionen", en: "At reception" } },
          ],
        },
        {
          heading: { sv: "Bra att veta", en: "Good to know" },
          rows: [
            { label: { sv: "Rökning", en: "Smoking" }, value: { sv: "Rökfritt hotell", en: "Non-smoking hotel" } },
            { label: { sv: "Husdjur", en: "Pets" }, value: { sv: "Fråga receptionen", en: "Please ask reception" } },
          ],
        },
      ],
    },
    {
      id: "breakfast",
      icon: "coffee",
      title: { sv: "Frukost", en: "Breakfast" },
      subtitle: { sv: "Tider, buffé, specialkost", en: "Times, buffet, dietary needs" },
      answer: {
        sv: "God morgon! Frukosten serveras 07.00–10.30 (helger 07.30–11.00) i restaurang Aurora på entréplan. Kan jag hjälpa dig med något mer?",
        en: "Good morning! Breakfast is served 7:00–10:30 am (weekends 7:30–11:00 am) in Aurora restaurant on the ground floor. Is there anything else I can help you with?",
      },
      keywords: ["frukost", "breakfast", "morgon", "buffé", "buffet", "allergi", "allerg", "gluten", "vegan", "laktos", "lactose", "specialkost", "dietary"],
      groups: [
        {
          heading: { sv: "Frukosttider", en: "Breakfast hours" },
          rows: [
            { label: { sv: "Vardagar", en: "Weekdays" }, value: "07.00 – 10.30" },
            { label: { sv: "Helger", en: "Weekends" }, value: "07.30 – 11.00" },
            { label: { sv: "Plats", en: "Location" }, value: { sv: "Restaurang Aurora, entréplan", en: "Aurora restaurant, ground floor" } },
          ],
        },
        {
          heading: { sv: "Buffén", en: "The buffet" },
          rows: [
            { label: { sv: "Ingår", en: "Includes" }, value: { sv: "Nybakat bröd, ägg, frukt, yoghurt, varma rätter, kaffe och te", en: "Freshly baked bread, eggs, fruit, yoghurt, hot dishes, coffee and tea" } },
          ],
        },
        {
          heading: { sv: "Allergier och specialkost", en: "Allergies and dietary needs" },
          rows: [
            { label: { sv: "Specialkost", en: "Dietary options" }, value: { sv: "Gluten- och laktosfria alternativ finns. Fråga personalen vid allergier.", en: "Gluten- and lactose-free options are available. Please ask our staff about allergies." } },
          ],
        },
      ],
      actions: [{ label: { sv: "Kontakta personalen", en: "Contact our staff" }, href: "#contact" }],
    },
    {
      id: "spa",
      icon: "spa",
      title: { sv: "Spa & Wellness", en: "Spa & Wellness" },
      subtitle: { sv: "Behandlingar och öppettider", en: "Treatments and opening hours" },
      answer: {
        sv: "Ja, självklart! Vi har en härlig spaavdelning där du kan koppla av. Här ser du öppettider, behandlingar och bokning:",
        en: "Yes, of course! We have a lovely spa where you can relax. Here are the opening hours, treatments and booking options:",
      },
      keywords: ["spa", "wellness", "massage", "bastu", "sauna", "pool", "behandling", "treatment", "ansikte", "facial", "relax"],
      groups: [
        {
          heading: { sv: "Öppettider", en: "Opening hours" },
          rows: [
            { label: { sv: "Alla dagar", en: "Every day" }, value: "09.00 – 21.00" },
            { label: { sv: "Plats", en: "Location" }, value: { sv: "Plan -1", en: "Floor -1" } },
          ],
        },
        {
          heading: { sv: "Behandlingar (exempelpriser)", en: "Treatments (example prices)" },
          rows: [
            { label: { sv: "Klassisk massage 50 min", en: "Classic massage 50 min" }, value: "995 kr" },
            { label: { sv: "Ansiktsbehandling 60 min", en: "Facial 60 min" }, value: "1 195 kr" },
            { label: { sv: "Spa-entré", en: "Spa entrance" }, value: { sv: "Ingår för hotellgäster", en: "Included for hotel guests" } },
          ],
        },
        {
          heading: { sv: "Faciliteter", en: "Facilities" },
          rows: [{ label: { sv: "Ingår", en: "Includes" }, value: { sv: "Bastu, ångbad, relaxavdelning och pool", en: "Sauna, steam room, relaxation area and pool" } }],
        },
      ],
      actions: [{ label: { sv: "Boka spa", en: "Book spa" }, href: "" }],
      showBookingDisclaimer: true,
    },
    {
      id: "restaurant",
      icon: "restaurant",
      title: { sv: "Restaurang", en: "Restaurant" },
      subtitle: { sv: "Meny, tider, bordsbokning", en: "Menu, hours, table booking" },
      answer: {
        sv: "Restaurang Aurora har öppet för middag 17.30–22.00. Här hittar du meny, erbjudanden och bordsbokning:",
        en: "Aurora restaurant is open for dinner 5:30–10:00 pm. Here you'll find the menu, offers and table booking:",
      },
      keywords: ["restaurang", "restaurant", "middag", "dinner", "lunch", "meny", "menu", "äta", "eat", "bord", "table", "bar", "mat", "food"],
      groups: [
        {
          heading: { sv: "Öppettider", en: "Opening hours" },
          rows: [
            { label: { sv: "Middag", en: "Dinner" }, value: "17.30 – 22.00" },
            { label: { sv: "Bar", en: "Bar" }, value: "16.00 – 00.00" },
          ],
        },
        {
          heading: { sv: "Ur menyn (exempel)", en: "From the menu (examples)" },
          rows: [
            { label: { sv: "Förrätt", en: "Starter" }, value: { sv: "Toast Skagen", en: "Toast Skagen" } },
            { label: { sv: "Varmrätt", en: "Main" }, value: { sv: "Halstrad torskrygg med brynt smör", en: "Seared cod loin with brown butter" } },
            { label: { sv: "Dessert", en: "Dessert" }, value: { sv: "Vaniljpannacotta med bär", en: "Vanilla panna cotta with berries" } },
          ],
        },
        {
          heading: { sv: "Erbjudande", en: "Offer" },
          rows: [{ label: { sv: "Veckans meny", en: "Menu of the week" }, value: { sv: "Tre rätter – fråga personalen om pris", en: "Three courses – ask our staff for pricing" } }],
        },
      ],
      actions: [{ label: { sv: "Boka bord", en: "Book a table" }, href: "" }],
      showBookingDisclaimer: true,
    },
    {
      id: "transport",
      icon: "transport",
      title: { sv: "Transport", en: "Transport" },
      subtitle: { sv: "Taxi, flyg, tåg, parkering", en: "Taxi, airport, train, parking" },
      answer: {
        sv: "Receptionen hjälper gärna till att beställa taxi eller flygplatstransfer. Här är transportinformationen:",
        en: "Reception will gladly help you book a taxi or airport transfer. Here is the transport information:",
      },
      keywords: ["taxi", "flyg", "airport", "flygplats", "transfer", "tåg", "train", "buss", "bus", "spårvagn", "tram", "vägbeskrivning", "directions", "transport", "garage"],
      groups: [
        {
          heading: { sv: "Taxi och transfer", en: "Taxi and transfer" },
          rows: [
            { label: { sv: "Taxi", en: "Taxi" }, value: { sv: "Beställs via receptionen", en: "Booked via reception" } },
            { label: { sv: "Flygplatstransfer", en: "Airport transfer" }, value: { sv: "Bokas i förväg via receptionen", en: "Pre-book via reception" } },
          ],
        },
        {
          heading: { sv: "Kollektivtrafik", en: "Public transport" },
          rows: [{ label: { sv: "Tåg och buss", en: "Train and bus" }, value: { sv: "Fråga receptionen om närmaste hållplats", en: "Ask reception for the nearest stop" } }],
        },
        {
          heading: { sv: "Parkering", en: "Parking" },
          rows: [{ label: { sv: "Garage", en: "Garage" }, value: { sv: "Under hotellet – fråga receptionen om pris", en: "Below the hotel – ask reception for pricing" } }],
        },
      ],
      actions: [{ label: { sv: "Vägbeskrivning", en: "Directions" }, href: "" }],
    },
    {
      id: "explore",
      icon: "explore",
      title: { sv: "Upptäck närområdet", en: "Explore Nearby" },
      subtitle: { sv: "Sevärdheter, shopping, tips", en: "Sights, shopping, tips" },
      answer: {
        sv: "Här är några exempel på vad du kan upptäcka i närheten. Kontrollera alltid aktuella öppettider på plats:",
        en: "Here are some examples of what to discover nearby. Always check current opening hours locally:",
      },
      keywords: ["sevärd", "sight", "museum", "shopping", "handla", "shop", "aktivitet", "activit", "göra", "do nearby", "tips", "närområde", "nearby", "explore", "upptäck"],
      groups: [
        {
          heading: { sv: "Exempel för demohotellet", en: "Examples for the demo hotel" },
          rows: [
            { label: { sv: "Sevärdhet", en: "Sight" }, value: { sv: "Stadens konstmuseum – kort promenad", en: "The city art museum – short walk" } },
            { label: { sv: "Shopping", en: "Shopping" }, value: { sv: "Gågatan med butiker och designbutiker", en: "The pedestrian street with boutiques and design shops" } },
            { label: { sv: "Aktivitet", en: "Activity" }, value: { sv: "Guidad stadsvandring – fråga receptionen", en: "Guided city walk – ask reception" } },
            { label: { sv: "Restaurang", en: "Restaurant" }, value: { sv: "Fråga receptionen om dagens rekommendation", en: "Ask reception for today's recommendation" } },
          ],
        },
      ],
    },
    {
      id: "contact",
      icon: "phone",
      title: { sv: "Kontakta receptionen", en: "Contact Reception" },
      subtitle: { sv: "Ring, mejla eller skriv", en: "Call, email or write" },
      answer: {
        sv: "Receptionen är öppen dygnet runt. Du kan ringa, mejla eller skicka ett meddelande här:",
        en: "Reception is open 24 hours a day. You can call, email or send a message here:",
      },
      keywords: ["reception", "receptionen", "ring", "call", "telefon", "phone", "mejl", "mail", "e-post", "email", "kontakt", "contact", "hjälp", "help", "personal", "staff"],
      groups: [],
      showContactForm: true,
    },
    {
      id: "book",
      icon: "book",
      title: { sv: "Boka och upptäck mer", en: "Book & Explore More" },
      subtitle: { sv: "Bokningar och erbjudanden", en: "Bookings and offers" },
      answer: {
        sv: "Här hittar du hotellets bokningar och aktuella erbjudanden. Bokningen görs i hotellets eget system:",
        en: "Here you'll find the hotel's bookings and current offers. Bookings are made in the hotel's own system:",
      },
      keywords: ["boka", "book", "bokning", "booking", "erbjudande", "offer", "paket", "package", "upplevelse", "experience", "rum", "room"],
      groups: [
        {
          heading: { sv: "Aktuella erbjudanden (exempel)", en: "Current offers (examples)" },
          rows: [
            { label: { sv: "Spaweekend", en: "Spa weekend" }, value: { sv: "Övernattning, frukost och spa", en: "Overnight stay, breakfast and spa" } },
            { label: { sv: "Middagspaket", en: "Dinner package" }, value: { sv: "Övernattning och tre rätters middag", en: "Overnight stay and three-course dinner" } },
          ],
        },
      ],
      actions: [
        { label: { sv: "Boka hotellrum", en: "Book a room" }, href: "" },
        { label: { sv: "Boka spa", en: "Book spa" }, href: "" },
        { label: { sv: "Boka bord", en: "Book a table" }, href: "" },
        { label: { sv: "Upplevelser", en: "Experiences" }, href: "" },
      ],
      showBookingDisclaimer: true,
    },
  ],
};

const HOTELS: Record<string, Hotel> = {
  [grandAurora.slug]: grandAurora,
};

export function getHotel(slug: string): Hotel | undefined {
  return HOTELS[slug];
}

export function getAllHotelSlugs(): string[] {
  return Object.keys(HOTELS);
}

export function txt(value: Text | string, lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}
