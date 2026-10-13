"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Car,
  ChevronRight,
  Coffee,
  Compass,
  ExternalLink,
  Flower2,
  Info,
  Mail,
  Phone,
  Send,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { LANGS, UI, type Lang } from "@/lib/i18n";
import { txt, type Hotel, type IconName, type Section, type SectionId } from "@/lib/hotels";

const ICONS: Record<IconName, LucideIcon> = {
  info: Info,
  coffee: Coffee,
  spa: Flower2,
  restaurant: UtensilsCrossed,
  transport: Car,
  explore: Compass,
  phone: Phone,
  book: CalendarCheck,
};

type ChatMessage = { from: "guest" | "monica"; text: string; sectionId?: SectionId };

const LANG_KEY = "monicaloov-lang";

export default function Concierge({ hotel }: { hotel: Hotel }) {
  const [lang, setLang] = useState<Lang>("sv");
  const [openId, setOpenId] = useState<SectionId | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const openedByClick = useRef(false);

  const t = (key: keyof typeof UI) => UI[key][lang];
  const sectionById = (id: SectionId) => hotel.sections.find((s) => s.id === id);
  const openSection = openId ? sectionById(openId) : undefined;

  // Kom ihåg gästens språk
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved && (LANGS as readonly string[]).includes(saved)) setLang(saved as Lang);
    } catch {
      /* lagring inte tillgänglig – ignorera */
    }
  }, []);

  function changeLang(next: Lang) {
    setLang(next);
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* ignorera */
    }
  }

  // Öppna avsnitt via adressen (#spa osv) så att mobilens bakåtknapp fungerar
  useEffect(() => {
    function syncFromHash() {
      const id = window.location.hash.replace("#", "") as SectionId;
      setOpenId(hotel.sections.some((s) => s.id === id) ? id : null);
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [hotel.sections]);

  useEffect(() => {
    if (openId) window.scrollTo({ top: 0 });
  }, [openId]);

  function open(id: SectionId) {
    openedByClick.current = true;
    window.location.hash = id;
  }

  function close() {
    if (openedByClick.current) {
      openedByClick.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      setOpenId(null);
    }
  }

  // Demo-chatt: hittar rätt avsnitt utifrån nyckelord. Riktig AI kopplas in senare.
  function ask(e: FormEvent) {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    const lower = q.toLowerCase();
    let replyLang = lang;
    let reply: ChatMessage;

    if (/(english|engelska)/.test(lower)) {
      replyLang = "en";
      reply = { from: "monica", text: UI.switchedToEn.en };
    } else if (/(svenska|swedish)/.test(lower)) {
      replyLang = "sv";
      reply = { from: "monica", text: UI.switchedToSv.sv };
    } else {
      let best: Section | undefined;
      let bestScore = 0;
      for (const s of hotel.sections) {
        const score = s.keywords.filter((k) => lower.includes(k)).length;
        if (score > bestScore) {
          best = s;
          bestScore = score;
        }
      }
      reply = best
        ? { from: "monica", text: best.answer[lang], sectionId: best.id }
        : { from: "monica", text: UI.fallback[lang], sectionId: "contact" };
    }

    if (replyLang !== lang) changeLang(replyLang);
    setMessages((prev) => [...prev, { from: "guest" as const, text: q }, reply].slice(-6));
    setQuestion("");
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-ivory shadow-[0_0_60px_rgba(16,27,50,0.08)]">
      {/* Topprad */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-navy/95 px-5 py-3.5 backdrop-blur">
        {openSection ? (
          <button
            onClick={close}
            className="flex min-h-11 items-center gap-2 rounded-full pr-3 text-sm font-medium text-ivory"
          >
            <ArrowLeft size={20} className="text-gold" aria-hidden />
            {t("back")}
          </button>
        ) : (
          <Logo />
        )}
        <div className="flex rounded-full border border-gold/40 p-0.5" role="group" aria-label="Språk / Language">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => changeLang(l)}
              aria-pressed={lang === l}
              className={`min-h-9 min-w-11 rounded-full px-3 text-xs font-semibold uppercase tracking-wider transition ${
                lang === l ? "bg-gold text-navy" : "text-ivory/80 hover:text-ivory"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      {openSection ? (
        <SectionView key={openSection.id} section={openSection} hotel={hotel} lang={lang} />
      ) : (
        <main>
          {/* Avatar och välkomst */}
          <section className="bg-navy px-5 pb-16 pt-2">
            <div className="fade-up relative overflow-hidden rounded-[28px] ring-1 ring-gold/30">
              <AvatarMedia hotel={hotel} lang={lang} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
              {hotel.isDemo && (
                <span className="absolute right-4 top-4 rounded-full bg-navy/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold ring-1 ring-gold/40">
                  {t("demoBadge")}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">{t("tagline")}</p>
                <h1 className="mt-1 font-serif text-[32px] font-semibold leading-tight text-white">{hotel.name}</h1>
              </div>
            </div>
          </section>

          <section className="-mt-10 px-5">
            <div className="fade-up rounded-[24px] bg-white p-6 shadow-[0_12px_40px_rgba(16,27,50,0.10)]">
              <WelcomeText text={hotel.welcome[lang]} />

              {/* Fråga Monica */}
              <form onSubmit={ask} className="mt-6">
                <label htmlFor="ask" className="mb-2 block text-sm font-medium text-ink">
                  {t("askTitle")}
                </label>
                <div className="flex gap-2">
                  <input
                    id="ask"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    maxLength={300}
                    placeholder={t("askPlaceholder")}
                    className="min-h-12 min-w-0 flex-1 rounded-full border border-beige bg-ivory px-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
                  />
                  <button
                    type="submit"
                    aria-label={t("askButton")}
                    className="flex min-h-12 min-w-12 items-center justify-center rounded-full bg-navy text-gold transition hover:bg-navy/90 active:scale-95"
                  >
                    <Send size={18} aria-hidden />
                  </button>
                </div>
              </form>

              {messages.length > 0 && (
                <div className="mt-4 space-y-3" aria-live="polite">
                  {messages.map((m, i) => (
                    <div key={i} className={m.from === "guest" ? "flex justify-end" : "flex justify-start"}>
                      <div
                        className={`fade-up max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                          m.from === "guest" ? "rounded-br-md bg-navy text-ivory" : "rounded-bl-md bg-ivory text-ink ring-1 ring-beige"
                        }`}
                      >
                        {m.text}
                        {m.sectionId && (
                          <button
                            onClick={() => open(m.sectionId!)}
                            className="mt-2 flex items-center gap-1 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                          >
                            {t("showMore")}: {sectionById(m.sectionId)?.title[lang]}
                            <ChevronRight size={16} aria-hidden />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <p className="text-xs leading-relaxed text-ink/50">{t("chatNotice")}</p>
                </div>
              )}

              {/* Snabbval */}
              <p className="mb-2 mt-6 text-sm font-medium text-ink">{t("quickTitle")}</p>
              <div className="flex flex-wrap gap-2">
                {hotel.quickPicks.map((id) => {
                  const s = sectionById(id);
                  if (!s) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => open(id)}
                      className="min-h-11 rounded-full border border-gold/50 bg-ivory px-4 text-sm font-medium text-navy transition hover:bg-beige active:scale-95"
                    >
                      {s.title[lang]}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Åtta funktionskort */}
          <section className="px-5 pb-8 pt-10">
            <h2 className="font-serif text-[28px] font-semibold text-navy">{t("servicesTitle")}</h2>
            <div className="mt-1 h-px w-12 bg-gold" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {hotel.sections.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <button
                    key={s.id}
                    onClick={() => open(s.id)}
                    style={{ animationDelay: `${i * 50}ms` }}
                    className="fade-up flex min-h-36 flex-col items-start rounded-[20px] bg-white p-4 text-left ring-1 ring-beige transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(16,27,50,0.10)] active:scale-[0.98]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold">
                      <Icon size={20} strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="mt-3 font-serif text-[19px] font-semibold leading-tight text-navy">{s.title[lang]}</span>
                    <span className="mt-1 text-xs leading-snug text-ink/60">{s.subtitle[lang]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="px-5">
            <Footer lang={lang} isDemo={hotel.isDemo} />
          </div>
        </main>
      )}
    </div>
  );
}

function Logo() {
  return (
    <span className="font-serif text-[22px] font-semibold tracking-wide text-ivory">
      MonicaLoov<span className="text-gold">.ai</span>
    </span>
  );
}

function AvatarMedia({ hotel, lang }: { hotel: Hotel; lang: Lang }) {
  const { imageUrl, videoUrl, alt } = hotel.avatar;
  if (videoUrl) {
    return (
      <video
        src={videoUrl}
        poster={imageUrl}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt[lang]}
        className="aspect-[4/5] w-full object-cover object-top"
      />
    );
  }
  return (
    <Image
      src={imageUrl}
      alt={alt[lang]}
      width={864}
      height={1080}
      preload
      sizes="(max-width: 448px) 100vw, 448px"
      className="aspect-[4/5] w-full object-cover object-top"
    />
  );
}

function WelcomeText({ text }: { text: string }) {
  const [first, ...rest] = text.split("\n\n");
  return (
    <div>
      <p className="font-serif text-[24px] font-semibold leading-snug text-navy">{first}</p>
      {rest.map((p, i) => (
        <p key={i} className="mt-3 text-[15px] leading-relaxed text-ink/80">
          {p}
        </p>
      ))}
    </div>
  );
}

function SectionView({ section, hotel, lang }: { section: Section; hotel: Hotel; lang: Lang }) {
  const Icon = ICONS[section.icon];
  return (
    <main className="fade-up px-5 pb-10 pt-6">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
          <Icon size={24} strokeWidth={1.6} aria-hidden />
        </span>
        <div>
          <h1 className="font-serif text-[30px] font-semibold leading-tight text-navy">{section.title[lang]}</h1>
          <p className="text-sm text-ink/60">{section.subtitle[lang]}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {section.groups.map((g, gi) => (
          <div key={gi} className="rounded-[20px] bg-white p-5 ring-1 ring-beige">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{g.heading[lang]}</h2>
            <dl className="mt-3 divide-y divide-beige">
              {g.rows.map((r, ri) => (
                <div key={ri} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-sm text-ink/60">{txt(r.label, lang)}</dt>
                  <dd className="text-[15px] font-medium text-ink sm:text-right">{txt(r.value, lang)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        {section.showContactForm && <ContactBlock hotel={hotel} lang={lang} />}

        {section.actions && section.actions.length > 0 && (
          <div className="space-y-3 pt-2">
            {section.actions.map((a, ai) => (
              <ActionButton key={ai} label={a.label[lang]} href={a.href} lang={lang} />
            ))}
          </div>
        )}

        {section.showBookingDisclaimer && (
          <p className="text-xs leading-relaxed text-ink/50">{UI.bookingDisclaimer[lang]}</p>
        )}
      </div>

      <Footer lang={lang} isDemo={hotel.isDemo} />
    </main>
  );
}

function ActionButton({ label, href, lang }: { label: string; href: string; lang: Lang }) {
  const base =
    "flex min-h-13 w-full items-center justify-between rounded-full px-6 text-[15px] font-semibold transition active:scale-[0.98]";
  if (!href) {
    return (
      <div className={`${base} cursor-not-allowed bg-beige/60 text-ink/50`} aria-disabled>
        <span>{label}</span>
        <span className="text-xs font-normal">{UI.linkNotSet[lang]}</span>
      </div>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} bg-navy text-ivory hover:bg-navy/90`}
    >
      <span>{label}</span>
      {external ? <ExternalLink size={18} className="text-gold" aria-hidden /> : <ChevronRight size={18} className="text-gold" aria-hidden />}
    </a>
  );
}

function ContactBlock({ hotel, lang }: { hotel: Hotel; lang: Lang }) {
  const { reception } = hotel;
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`tel:${reception.phone}`}
          className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-[20px] bg-navy text-ivory transition active:scale-[0.98]"
        >
          <Phone size={22} className="text-gold" aria-hidden />
          <span className="text-sm font-semibold">{lang === "sv" ? "Ring" : "Call"}</span>
        </a>
        <a
          href={`mailto:${reception.email}`}
          className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-[20px] bg-white text-navy ring-1 ring-beige transition active:scale-[0.98]"
        >
          <Mail size={22} className="text-gold" aria-hidden />
          <span className="text-sm font-semibold">{lang === "sv" ? "Mejla" : "Email"}</span>
        </a>
      </div>
      <div className="rounded-[20px] bg-white p-5 ring-1 ring-beige">
        <dl className="divide-y divide-beige">
          <Item label={lang === "sv" ? "Telefon" : "Phone"} value={reception.phoneDisplay} />
          <Item label={lang === "sv" ? "E-post" : "Email"} value={reception.email} />
          <Item label={lang === "sv" ? "Öppettider" : "Opening hours"} value={reception.hours[lang]} />
        </dl>
      </div>
      <ContactForm hotelName={hotel.name} lang={lang} />
    </>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5">
      <dt className="text-sm text-ink/60">{label}</dt>
      <dd className="break-all text-[15px] font-medium text-ink">{value}</dd>
    </div>
  );
}

// Formspree-ID är inte hemligt, men läggs i Vercel (inte i koden) så att varje miljö kan ha sitt eget.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

function ContactForm({ hotelName, lang }: { hotelName: string; lang: Lang }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ID) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("hotel", hotelName);
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Formspree error");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const input =
    "min-h-12 w-full rounded-2xl border border-beige bg-ivory px-4 text-base text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <div className="rounded-[20px] bg-white p-5 ring-1 ring-beige">
      <h2 className="font-serif text-[22px] font-semibold text-navy">{UI.contactFormTitle[lang]}</h2>
      {!FORMSPREE_ID ? (
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{UI.formNotConnected[lang]}</p>
      ) : status === "sent" ? (
        <p className="mt-3 rounded-2xl bg-ivory p-4 text-[15px] text-navy ring-1 ring-gold/40">{UI.sent[lang]}</p>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <input name="name" required maxLength={100} placeholder={UI.name[lang]} aria-label={UI.name[lang]} className={input} />
          <input name="email" type="email" required maxLength={150} placeholder={UI.email[lang]} aria-label={UI.email[lang]} className={input} />
          <input name="room" maxLength={20} placeholder={UI.room[lang]} aria-label={UI.room[lang]} className={input} />
          <textarea
            name="message"
            required
            maxLength={1500}
            rows={4}
            placeholder={UI.message[lang]}
            aria-label={UI.message[lang]}
            className={`${input} py-3`}
          />
          {/* Skydd mot spam-robotar (Formspree) */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />
          {status === "error" && <p className="text-sm text-red-700">{UI.sendError[lang]}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-13 w-full rounded-full bg-navy text-[15px] font-semibold text-ivory transition hover:bg-navy/90 disabled:opacity-60"
          >
            {status === "sending" ? UI.sending[lang] : UI.send[lang]}
          </button>
        </form>
      )}
    </div>
  );
}

function Footer({ lang, isDemo }: { lang: Lang; isDemo: boolean }) {
  return (
    <footer className="mt-10 border-t border-beige px-1 pt-6 text-center">
      <p className="text-xs text-ink/50">{UI.cubiqoLine[lang]}</p>
      <p className="mt-2 font-serif text-base font-semibold text-navy">
        {UI.poweredBy[lang].replace("MonicaLoov.ai", "")}
        <span>MonicaLoov</span>
        <span className="text-gold">.ai</span>
      </p>
      {isDemo && <p className="mt-3 pb-6 text-[11px] leading-relaxed text-ink/40">{UI.demoNotice[lang]}</p>}
    </footer>
  );
}
