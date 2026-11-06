"use client";

import posthog from "posthog-js";
import styles from "./Pricing.module.css";

const features = [
  ["One request at a time", "Updates every 48 hours", "Unlimited brands", "Design & development"],
  ["Web & mobile apps", "AI integrations", "Pause or cancel anytime"],
];

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className={styles.section}>
      <div className={styles.heading}>
        <h2 id="pricing-heading">Pricing</h2>
        <p>Your next big idea. One simple monthly plan.</p>
      </div>

      <article className={styles.card} aria-labelledby="monthly-plan-heading">
        <header className={styles.cardHeader}>
          <h3 id="monthly-plan-heading">Monthly Plan</h3>
          <span className={styles.flexibility}>Pause or cancel anytime</span>
        </header>

        <div className={styles.plan}>
          <p className={styles.badge}>Design & development subscription</p>
          <p className={styles.price}>
            <span className={styles.amount}>$750</span>
            <span className={styles.billing}>USD / month</span>
          </p>
        </div>

        <div className={styles.included}>
          <h4 className={styles.includedLabel}>Included</h4>
          <div className={styles.featureColumns}>
            {features.map((column, index) => (
              <ul key={index}>
                {column.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <a
            className={styles.join}
            href="https://cal.com/bhyte-lwy0r0/30min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("pricing_cta_clicked", {
              button_text: "Get started",
              plan_id: "monthly",
              plan_name: "Monthly Plan",
              price: 750,
              currency: "USD",
              billing_interval: "month",
            })}
          >
            <span>Get started</span>
            <span className={styles.joinIcon}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </article>
    </section>
  );
}
