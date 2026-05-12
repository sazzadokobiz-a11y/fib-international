import { Banner } from "@/components/landing/Banner";
import ExportSection from "@/components/landing/ExportSection";
import ImportSection from "@/components/landing/ImportSection";
import ImportProductsSection from "@/components/landing/ImportProductsSection";
import AboutUsSection from "@/components/landing/AboutUsSection";
import PartnerLogoSection from "@/components/landing/PartnerLogoSection";
import MissionVision from "@/components/landing/MissionVision";
import Cta from "@/components/landing/Cta";
import AddBanner from "@/components/landing/AddBanner";

export default function Home() {
  return (
    <>
      <Banner />
      <AddBanner />
      <ExportSection />
      <ImportProductsSection />
      <ImportSection />
      <AboutUsSection />
      <PartnerLogoSection />
      <MissionVision />
      <Cta />
    </>
  );
}
