import { HomeClient } from "@/components/home/HomeClient";
import { ContactSection } from "@/components/home/ContactSection";
import { CommercialAdAssistant } from "@/components/advertising/CommercialAdAssistant";
import { HashCleaner } from "@/components/navigation/HashCleaner";

export default function Home() {
  return (
    <>
      <HashCleaner />
      <HomeClient />
      <CommercialAdAssistant />
      <ContactSection />
    </>
  );
}
