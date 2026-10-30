import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PartnerDetail } from "../../../../components/partners/PartnerDetail";
import { getPartner, getPartnerDetail, getPartnerTranslation, getPartnerMedia, getPartners, partnerSlug, partnerUrl } from "../../../../lib/wiki/partners";

type Props = { params: Promise<{ partnerId: string }> };

export function generateStaticParams() { return getPartners().map(partner => ({ partnerId: partnerSlug(partner) })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const partner = getPartner((await params).partnerId);
  return partner ? { title: `${partner.name} | Partners | CZN Wiki`, description: `${partner.name}'s support card, passive abilities, and partner stats.`, alternates: { canonical: partnerUrl(partner) } } : { title: "Partner not found | CZN Wiki" };
}

export default async function PartnerPage({ params }: Props) {
  const { partnerId } = await params;
  const partner = getPartner(partnerId);
  if (!partner || partner.kind !== "supporter") notFound();
  if (partnerId !== partnerSlug(partner)) permanentRedirect(partnerUrl(partner));
  return <PartnerDetail key={partner.id} partner={partner} detail={getPartnerDetail(partner.id)} translation={getPartnerTranslation(partner.id)} media={getPartnerMedia(partner.id)} />;
}
