import { BrandLogo } from "@/components/brand/BrandLogo";

const agents = ["Alex", "Nora", "Leo", "Mia", "Lina", "Aria", "Eli", "Zoe", "Max", "Kai", "Iris", "Adam", "Ryan", "Luna", "Atlas"];
const services = ["Websites & modernization", "AI integration & automation", "SEO, analytics & marketing"];
const steps = ["Describe your business", "Confirm payment", "Alex creates the plan", "Agents execute and report"];
const plans = [["Starter", "€99/month"], ["Business", "€299/month"], ["Growth", "€699/month"], ["Enterprise", "Custom"]];

const HERO_VIDEO_SRC = "https://raw.githubusercontent.com/saiedahm/NEXORA-Digital/main/assetsvideonexora-hero.mp4";
const LOGO_SRC = "https://raw.githubusercontent.com/saiedahm/NEXORA-Digital/main/assetsimagesnexora-logo.png";

export default function Home() {
  return (
    <main>
      <section className="hero-video" aria-label="NEXORA DIGITAL hero">
        <video className="hero-video-media" autoPlay muted loop playsInline preload="metadata" aria-label="NEXORA DIGITAL">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </section>

      <header className="sticky top-0 z-10 border-b border-[#202A46] bg-[#050816]/90 backdrop-blur">
        <div className="container flex items-center justify-between px-6 py-4">
          <BrandLogo width={155} />
          <nav className="hidden gap-6 text-sm text-[#A7B0C0] md:flex">
            <a href="#how">How It Works</a><a href="#team">AI Team</a><a href="#services">Services</a><a href="#pricing">Pricing</a>
          </nav>
        </div>
      </header>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#00D9FF]">AI + WEB + AUTOMATION</p>
            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">Your Business.<br /><span className="gradient-text">Built. Managed. Grown.</span><br />By AI.</h1>
            <p className="mt-6 max-w-2xl text-lg text-[#A7B0C0]">NEXORA DIGITAL connects real AI agents, real workflows, real tools and real project execution.</p>
          </div>
          <div className="card p-5"><img src={LOGO_SRC} alt="NEXORA DIGITAL" className="mx-auto w-full max-w-sm" /></div>
        </div>
      </section>

      <section id="how" className="section bg-[#070b1c]"><div className="container"><h2 className="text-4xl font-bold">How It Works</h2><div className="mt-10 grid gap-5 md:grid-cols-4">{steps.map((step, index) => <div className="card p-6" key={step}><div className="mb-4 text-2xl font-bold text-[#00D9FF]">0{index + 1}</div><p className="text-[#A7B0C0]">{step}</p></div>)}</div></div></section>

      <section id="team" className="section"><div className="container"><h2 className="text-4xl font-bold">The AI Team</h2><p className="mt-3 text-[#A7B0C0]">15 specialized managers operating under controlled permissions and real task state.</p><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">{agents.map((agent) => <div className="card p-5 text-center" key={agent}><div className="font-semibold">{agent}</div><div className="mt-1 text-xs text-[#667085]">AI Manager</div></div>)}</div></div></section>

      <section id="services" className="section bg-[#070b1c]"><div className="container"><h2 className="text-4xl font-bold">Services</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{services.map((service) => <div className="card p-7" key={service}><h3 className="text-xl font-semibold">{service}</h3><p className="mt-3 text-[#A7B0C0]">Executed through the NEXORA project workflow and recorded as real system state.</p></div>)}</div></div></section>

      <section id="pricing" className="section"><div className="container"><h2 className="text-4xl font-bold">Plans</h2><div className="mt-8 grid gap-5 md:grid-cols-4">{plans.map(([name, price]) => <div className="card p-7" key={name}><h3 className="text-xl font-semibold">{name}</h3><div className="mt-4 text-2xl font-bold">{price}</div></div>)}</div></div></section>

      <footer className="border-t border-[#202A46] px-6 py-12"><div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><BrandLogo width={135} /><p className="text-sm text-[#667085]">© NEXORA DIGITAL 2026. All Rights Reserved.</p></div></footer>
    </main>
  );
}
