"use client";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    features: ["5 Projects", "Basic Analytics", "24/7 Support"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$49",
    features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Integrations"],
    cta: "Choose Plan",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Dedicated Account Manager", "Custom Features", "Premium Support"],
    cta: "Contact Us",
  },
];

export const Pricing = () => {
  return (
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Pricing Plans
      </h2>
      <p className="mt-6 text-lg leading-8 text-white/70">
        Choose the plan that's right for your team.
      </p>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col gap-8 rounded-2xl p-8 ${
              tier.featured ? "bg-slate-800 border-2 border-white/50" : "bg-white/10 border border-white/20"
            }`}
          >
            <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
            <p className="text-4xl font-bold text-white">{tier.price}
              {tier.name !== "Enterprise" && tier.name !== "Starter" && <span className="text-lg font-normal text-white/70">/ month</span>}
            </p>
            <ul className="space-y-4 text-left">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-emerald-400" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`mt-auto rounded-md px-6 py-3 font-semibold ${
                tier.featured ? "bg-white text-slate-900" : "bg-slate-700 text-white"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};