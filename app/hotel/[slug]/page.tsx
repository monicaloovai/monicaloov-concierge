import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Concierge from "@/components/Concierge";
import { getAllHotelSlugs, getHotel } from "@/lib/hotels";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllHotelSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hotel = getHotel(slug);
  return {
    title: hotel ? `${hotel.name} – MonicaLoov.ai Concierge` : "MonicaLoov.ai Concierge",
  };
}

export default async function HotelPage({ params }: Props) {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) notFound();
  return <Concierge hotel={hotel} />;
}
