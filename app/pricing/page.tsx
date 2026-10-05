const plans = [
  {
    name: "Starter",
    price: "€99",
    period: "/ month",
    text: "For individuals starting a serious digital project.",
    features: ["AI Studio access", "Digital workspace", "Core automation"],
    featured: false,
  },
  {
    name: "Business",
    price: "€299",
    period: "/ month",
    text: "For businesses that want connected digital workflows.",
    features: ["Everything in Starter", "Advanced AI workflows", "Business workspace", "Priority support"],
    featured: true,
  },
  {
    name: "Growth",
    price: "€699",
    period: "/ month",
    text: "For growing teams building a larger digital operation.",
    features: ["Everything in Business", "Expanded automation", "Scalable workspace", "Growth support"],
    featured: false,
  },
];

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
        {plans.map((plan) => (
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
            <a className={plan.featured ? "primary-button" : "secondary-button"} href="/contact">
              Start with {plan.name} <span>→</span>
            </a>
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
