import { HomeClient } from "@/components/home/HomeClient";
import { HashCleaner } from "@/components/navigation/HashCleaner";

export default function Home() {
  return (
    <>
      <HashCleaner />
      <HomeClient />
    </>
  );
}
