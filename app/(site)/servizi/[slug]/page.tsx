import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService } from "@/lib/services";
import ServiceDetail from "@/components/services/ServiceDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return { title: "Servizio non trovato" };
  }

  return {
    title: service.title,
    description: service.subtitle ?? service.description ?? undefined,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) notFound();

  return <ServiceDetail service={service} />;
}
