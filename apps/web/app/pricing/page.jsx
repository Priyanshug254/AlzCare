// app/pricing/page.jsx
"use client";
import Link from "next/link"; // add this at the top of your file if it's not already there

import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    title: "Free",
    price: "₹0",
    description: "Basic access to therapy and tracking tools.",
    features: [
      "Memory games",
      "Appointment booking",
      "Basic progress tracking",
      "Community access",
    ],
    button: "Get Started",
    link: "/signup",
    highlight: false,
  },
  {
    title: "Advanced",
    price: "₹1249/mo",
    description: "Great for early-stage support and extra insights.",
    features: [
      "All Free features",
      "AI Chatbot (limited)",
      "Doctor-patient connect",
      "Intermediate analytics",
    ],
    button: "Try Advanced",
    highlight: false,
  },
  {
    title: "Premium",
    price: "₹2499/mo",
    description: "Unlock everything AlzCare offers with full power.",
    features: [
      "All Advanced features",
      "Full AI therapy access",
      "Detailed analytics & reports",
      "Blockchain-secured logs",
    ],
    button: "Upgrade Now",
    highlight: true,
  },
];

export default function PricingPage() {
  return (
      <section className="bg-gradient-to-br from-purple-50 to-white py-20 px-6 text-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-sm">Simple & Transparent Pricing</h2>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Choose the plan that suits your needs. No hidden fees, cancel anytime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <Card
                key={idx}
                className={`rounded-2xl shadow-xl p-8 transition-transform ${
                  plan.highlight ? "border-2 border-blue-500 scale-105" : "hover:scale-105"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-3xl font-extrabold text-blue-600 mb-4">{plan.price}</p>
                <p className="mb-6 text-gray-700">{plan.description}</p>

                <ul className="text-left space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button size="" variant="outline" className="px-8 bg-blue-600 text-white">{plan.button}</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
  );
}
