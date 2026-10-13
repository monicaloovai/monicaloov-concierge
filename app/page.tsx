import Image from "next/image";
import Link from "next/link";

const STEPS = [
  { title: "Cubiqo i hotellmiljön", text: "Gästen ser den designade Cubiqo-kuben i receptionen, på rummet eller i restaurangen." },
  { title: "Gästen skannar QR-koden", text: "Med mobilens vanliga kamera – ingen app behövs." },
  { title: "MonicaLoov.ai öppnas", text: "Hotellets egen concierge öppnas direkt i mobilen." },
  { title: "Monica hälsar välkommen", text: "Den personliga digitala värdinnan tar emot gästen på svenska eller engelska." },
  { title: "Gästen får hjälp", text: "Frågor, frukosttider, spa, restaurang, transport och bokningslänkar – dygnet runt." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-ivory">
      <div className="mx-auto max-w-md px-5 pb-16 pt-8">
        <p className="font-serif text-[26px] font-semibold tracking-wide">
          MonicaLoov<span className="text-gold">.ai</span>
        </p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
          AI Concierge – Your Personal Digital Host
        </p>

        <div className="fade-up relative mt-8 overflow-hidden rounded-[28px] ring-1 ring-gold/30">
          <Image
            src="/avatar.png"
            alt="Monica, MonicaLoov.ai:s digitala concierge"
            width={864}
            height={1080}
            preload
            sizes="(max-width: 448px) 100vw, 448px"
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h1 className="font-serif text-[32px] font-semibold leading-tight text-white">
              En personlig digital värdinna för ditt hotell
            </h1>
          </div>
        </div>

        <Link
          href="/hotel/grand-aurora"
          className="mt-6 flex min-h-14 items-center justify-center rounded-full bg-gold text-[15px] font-semibold text-navy transition hover:brightness-105 active:scale-[0.98]"
        >
          Öppna demo: The Grand Aurora Hotel
        </Link>

        <h2 className="mt-12 font-serif text-[28px] font-semibold">Så fungerar det</h2>
        <div className="mt-1 h-px w-12 bg-gold" />
        <ol className="mt-6 space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-[20px] bg-white/5 p-4 ring-1 ring-white/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold font-serif text-lg font-semibold text-gold">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-ivory">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ivory/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-xs text-ivory/50">
          Cubiqo är den fysiska ingången. MonicaLoov.ai är upplevelsen.
        </p>
      </div>
    </div>
  );
}
