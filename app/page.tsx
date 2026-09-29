import { HomeClient } from "@/components/home/HomeClient";
import { ContactSection } from "@/components/home/ContactSection";
import { ContactLanguageBridge } from "@/components/home/ContactLanguageBridge";
import { HashCleaner } from "@/components/navigation/HashCleaner";

export default function Home() {
  return (
    <>
      <HashCleaner />
      <HomeClient />
      <ContactSection />
      <ContactLanguageBridge />
    </>
  );
}
