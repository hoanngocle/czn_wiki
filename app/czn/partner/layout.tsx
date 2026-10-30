import { PartnerWorkspace } from "../../../components/partners/PartnerWorkspace";
import { getPartners, partnerUrl } from "../../../lib/wiki/partners";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <PartnerWorkspace partners={getPartners().map(partner => ({ ...partner, url: partnerUrl(partner) }))}>{children}</PartnerWorkspace>;
}
