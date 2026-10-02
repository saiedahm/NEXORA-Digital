"use client";

import dynamic from "next/dynamic";

const HomeClient = dynamic(
  () => import("@/components/home/HomeClient").then((mod) => mod.HomeClient),
  { ssr: false }
);

export default function Home() {
  return <HomeClient />;
}
