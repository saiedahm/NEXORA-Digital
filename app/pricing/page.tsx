const plans = [
  {
    name: "Starter",
    price: "€99",
    description: "For individuals and small projects ready to move forward.",
    features: ["Modern website creation", "AI-assisted planning", "Project workspace", "Essential support"]
  },
  {
    name: "Business",
    price: "€299",
    description: "For growing businesses that need a stronger digital presence.",
    features: ["Everything in Starter", "Website renewal", "Advanced AI assistance", "Growth-focused workspace"],
    featured: true
  },
  {
    name: "Growth",
    price: "€699",
    description: "For ambitious businesses building a larger digital operation.",
    features: ["Everything in Business", "Advanced project workflows", "AI Studio access", "Priority support"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with individual requirements and scale.",
    features: ["Custom platform setup", "Advanced workflows", "Dedicated requirements", "Enterprise support"]
  }
];

export default function PricingPage() {
  return (
    <main className="pricing-page">
      <a className="back-link" href="/">← NEXORA DIGITAL</a>

      <section className="pricing-hero">
        <p className="section-label">NEXORA PLANS</p>
        <h1>Choose the next step for your digital future.</h1>
        <p>Start with the level that fits your project today. Your platform can grow with you.</p>
      </section>

      <section className="pricing-grid">
        {plans.map((plan) => (
          <article className={plan.featured ? "plan featured-plan" : "plan"} key={plan.name}>
            {plan.featured && <div className="popular">MOST POPULAR</div>}
            <p className="plan-name">{plan.name}</p>
            <div className="plan-price">{plan.price}<small>{plan.price !== "Custom" && " / month"}</small></div>
            <p className="plan-description">{plan.description}</p>
            <ul>
              {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
            </ul>
            <a className={plan.featured ? "primary-button" : "secondary-button"} href="/#start">
              Get started <span>→</span>
            </a>
          </article>
        ))}
      </section>

      <p className="pricing-note">
        Pricing shown here is the product plan structure. Secure subscription payments will be connected in the payments stage.
      </p>
    </main>
  );
}
