import { HomeClient } from "@/components/home/HomeClient";
import { ContactSection } from "@/components/home/ContactSection";
import { CommercialAdLive } from "@/components/advertising/CommercialAdLive";
import { HashCleaner } from "@/components/navigation/HashCleaner";

export default function Home() {
  return (
    <>
      <HashCleaner />
      <HomeClient />
      <CommercialAdLive />
      <ContactSection />
    </>
  );
}
