import { NEXORA_PLANS } from "@/lib/plans";
import PricingActions from "./PricingActions";



export default function PricingPage() {
  return (
    <main className="inner-page pricing-page">
      <a className="back-link" href="/">← NEXORA</a>
      <div className="inner-kicker">NEXORA · PLANS</div>
      <h1>Choose your <span>next level.</span></h1>
      <p className="pricing-intro">
        Start with the NEXORA foundation and grow into a connected AI-powered digital platform.
      </p>

      <section className="pricing-grid">
        {NEXORA_PLANS.map((plan) => (
          <article className={`pricing-card ${plan.featured ? "pricing-featured" : ""}`} key={plan.name}>
            {plan.featured && <span className="pricing-badge">MOST POPULAR</span>}
            <div className="pricing-name">{plan.name}</div>
            <div className="pricing-price">{plan.price}<small>{plan.period}</small></div>
            <p>{plan.text}</p>
            <div className="pricing-features">
              {plan.features.map((feature) => (
                <span key={feature}>✓ {feature}</span>
              ))}
            </div>
            <PricingActions plan={plan.key} featured={plan.featured} />
          </article>
        ))}
      </section>

      <section className="pricing-custom">
        <div>
          <span className="pricing-label">ENTERPRISE</span>
          <h2>Need a <span>custom setup?</span></h2>
        </div>
        <p>For larger organizations, custom integrations and tailored workflows, talk to NEXORA directly.</p>
        <a className="secondary-button" href="/contact">Contact NEXORA →</a>
      </section>
    </main>
  );
}
